"use client"
import type {ChangeEvent, FormEvent, ReactNode} from 'react';
import {useState} from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {Iconify} from '@components/iconify';
import type {UsersInterface,ResponseReply,FormAlert} from "@components/interface";
import {HandleTable} from "@layouts/table";
import {AllModelsEnum} from "@components/interface";

export function StaffPage({students}: {
  students: UsersInterface[];
  user: UsersInterface;
}): ReactNode {

  const orderBy = 'name';

  const title = 'Students'

  const initialFormAlert: FormAlert  = {severity: undefined, content: ""}

  const initialFormError = {matriculationNumber: '',}

  const initialFormData = {
    fullName: '', matriculationNumber: '', department: ''
  }

  const [formAlert, setFormAlert] = useState(initialFormAlert);

  const [formError, setFormError] = useState(initialFormError);

  const dialogContentText = "Please fill this form, upload an excel result sheet and submit to add results"

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    resetState();

    const closeDialog = (): void => {
      setTimeout(() => {
        handleDialog();
        setFormAlert(initialFormAlert)
      }, 2000);
    }

    await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify(formData)
    }).then((res) => {
      const {message, error} = res.json() as unknown as ResponseReply;
      if (res.status === 201 || res.status === 200) {
        if (typeof message === 'string') {
          setFormAlert({severity: "success", content: message});
        } else {
          closeDialog();
        }
      } else if (error) {
        // TODO: make the database return error on duplicate item
        // if (error.code === 11000) {
        //   Object.keys(message.keyValue).map((item) => {
        //     const buffer = {...formError}
        //     buffer[item] = "This value already exists, please change it"
        //     setFormError(buffer)
        //   })
      } else {
        // eslint-disable-next-line no-console -- I need it to debug
        console.log(message);
        setFormAlert({
          severity: "error",
          content: "An error occurred please try again"
        })
        closeDialog();
      }
    }).catch(err => {
      // eslint-disable-next-line no-console -- I need it to debug
      console.log(err);
      setFormAlert({
        severity: "error",
        content: "An error occurred please try again"
      })
      closeDialog();
    })
  }


  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData)

  const handleFormData = (event: ChangeEvent<HTMLInputElement>): void => {
    resetState()
    const {name, value} = event.target
    setFormData({...formData, [name]: value})
  }

  const handleDialog = (): void => {
    setOpenDialog(!openDialog)
  }

  const resetState = (): void => {
    setFormAlert(initialFormAlert)
    setFormError({matriculationNumber: ''})
  }

  return (
    <Box>
      <Stack alignItems='center' direction='row' justifyContent='space-between' mb={5}>
        <Typography variant='h4'>{title}</Typography>

        <Button
          color='inherit'
          onClick={handleDialog}
          startIcon={<Iconify icon='eva:plus-fill'/>}
          variant='contained'
        >
          {`Add ${title}`}
        </Button>
      </Stack>

      <Dialog onClose={handleDialog} open={openDialog}>
        {formAlert.severity ? <Alert severity={formAlert.severity}>
          <AlertTitle>
            <Typography sx={{textTransform: 'capitalize', fontWeight: 'fontWeightMedium'}}>
              {formAlert.severity}
            </Typography>
          </AlertTitle>
          {formAlert.content}
        </Alert> : null}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- handleSubmit is an async function */}
        <form action="" onSubmit={handleSubmit}>
          <DialogTitle>{`New ${title}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogContentText}
            </DialogContentText>
            <Stack spacing={2} sx={{mt: 3}}>
              <TextField
                fullWidth
                label="Full Name"
                margin="dense"
                name="fullName"
                onChange={handleFormData}
                required
                type="text"
                value={formData.fullName}
                variant="standard"
              />
              <TextField
                error={formError.matriculationNumber !== ""}
                fullWidth
                helperText={formError.matriculationNumber}
                label="Matriculation Number"
                margin="dense"
                name="matriculationNumber"
                onChange={handleFormData}
                required
                type="text"
                value={formData.matriculationNumber}
                variant="standard"
              />
              <TextField
                fullWidth
                label="Department"
                margin="dense"
                name="department"
                onChange={handleFormData}
                required
                type="text"
                value={formData.department}
                variant="standard"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

      <HandleTable
        data={students}
        headLabel={[
          {id: 'name', label: 'Name'},
          {id: 'matriculationNumber', label: 'Matriculation Number'},
          {id: 'department', label: 'Department'},
          {id: 'isSignedUp', label: 'Signed Up'},
        ]}
        initialOrder={orderBy}
        modelType={AllModelsEnum.Users}
      />

    </Box>
  )
}
