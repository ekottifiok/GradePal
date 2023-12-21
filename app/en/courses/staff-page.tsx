/* eslint-disable @typescript-eslint/no-misused-promises -- form is getting an async */
'use client'
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import React, { useState } from 'react';
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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Iconify } from '@components/iconify';
import {AllModelsEnum} from '@components/interface';
import type {
  CoursesInterface, FormAlert,
  ResponseReply,
  UsersInterface
} from '@components/interface';
import { HandleTable } from '@layouts/table';



export function StaffPage({ courses }: {
  courses: CoursesInterface[], user: UsersInterface
}): ReactNode {

  const orderBy = 'title';

  const initialFormAlert: FormAlert = { severity: undefined, content: '' }

  const initialFormError = {
    title: '', courseCode: '', creditUnit: ''
  }

  const initialFormData = {
    title: '', creditUnit: 0, courseCode: ''
  }

  const [formAlert, setFormAlert] = useState(initialFormAlert);

  const [formError, setFormError] = useState(initialFormError)

  const [loading, setLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData)

  const resetState = (): void => {
    setFormAlert(initialFormAlert)
    setFormError(initialFormError)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    resetState();
    setLoading(true)


    if (formData.creditUnit === 0) {
      setFormError({
        ...formError, creditUnit: 'Credit Unit cannot be 0, please change it'
      })
      return
    }


    const closeDialog = (): void => {
      setTimeout(() => {
        handleDialog();
        setFormAlert(initialFormAlert)
      }, 2000);
    }

    await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify(formData)
    }).then(async (res) => {
      setLoading(false)
      const { message } = await res.json() as ResponseReply;
      if (res.status === 201) {
        message && setFormAlert({ severity: 'success', content: message });
        closeDialog()
      } else {
        setFormAlert({
          severity: 'error',
          content: 'An error occurred, please try again later'
        })
        // TODO: make the database return error on duplicate item
        // if (message.code === 11000) {
        //   Object.keys(message.keyValue).map((item) => {
        //     const buffer = {...formError}
        //     buffer[item] = 'This value already exists, please change it'
        //     setFormError(buffer)
        //   })
        // } else {
        //   closeDialog();
        // }

      }
    }).catch(err => {
      console.log(err);
      setFormAlert({
        severity: 'error',
        content: 'An error occured please try again'
      })
      closeDialog();
    })
  }

  const handleFormData = (event: ChangeEvent<HTMLInputElement>): void => {
    resetState();
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDialog = (): void => {
    setOpenDialog(!openDialog)
  }

  return (
    <Box>

      <Stack alignItems='center' direction='row' justifyContent='space-between' mb={5}>
        <Typography variant='h4'>Courses</Typography>
         <Button
          color='inherit'
          onClick={handleDialog}
          startIcon={<Iconify icon='eva:plus-fill' />}
          variant='contained'
        >
          Add Course
        </Button>
      </Stack>

      <Dialog onClose={handleDialog} open={openDialog}>

        {formAlert.content !== formAlert.severity && (
          <Alert severity={formAlert.severity}>
            <AlertTitle>
              <Typography sx={{ textTransform: 'capitalize', fontWeight: 'fontWeightMedium' }}>
                {formAlert.severity}
              </Typography>
            </AlertTitle>
            {formAlert.content}
          </Alert>
        )}

        <form action='' onSubmit={handleSubmit}>
          <DialogTitle>New Course</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill this form and submit to add a new course
            </DialogContentText>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextField
                error={formError.title !== ''}
                fullWidth
                helperText={formError.title}
                label='Title'
                margin='dense'
                name='title'
                onChange={handleFormData}
                required
                type='text'
                value={formData.title}
                variant='standard'
              />
              <TextField
                error={formError.courseCode !== ''}
                fullWidth
                helperText={formError.courseCode}
                label='Course Code'
                margin='dense'
                name='courseCode'
                onChange={handleFormData}
                required
                type='text'
                value={formData.courseCode}
                variant='standard'
              />
              <TextField
                error={formError.creditUnit !== ''}
                fullWidth
                helperText={formError.creditUnit}
                label='Credit Unit'
                margin='dense'
                name='creditUnit'
                onChange={handleFormData}
                required
                type='number'
                value={formData.creditUnit}
                variant='standard'
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color='inherit'
              fullWidth
              loading={loading}
              size='large'
              type='submit'
              variant='contained'
            >
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>

      <HandleTable
        data={courses}
        headLabel={[
          { id: 'title', label: 'Title' },
          { id: 'courseCode', label: 'Course Code' },
          { id: 'creditUnit', label: 'Credit Unit' },
        ]}
        initialOrder={orderBy}
        modelType={AllModelsEnum.Courses}
      />
    </Box>
  )

}
