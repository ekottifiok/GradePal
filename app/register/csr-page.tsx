"use client"
import type {AlertColor} from '@mui/material';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import {alpha, useTheme} from '@mui/material/styles';
import type {ChangeEvent, FormEvent, ReactNode, SyntheticEvent} from 'react';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {BgGradient} from "@components/theme";
import {Logo} from "@components/logo";
import type {ResponseReply, UserClaims} from "@components/interface";
import {TabPanel} from "@layouts/tab-panel";
import {IMAGE_PATH} from "@components/constants";

// ----------------------------------------------------------------------

export function CSRPage({user}: {user: UserClaims}): ReactNode {
  const router = useRouter();

  const theme = useTheme();

  const initialFormAlert = {severity: undefined, content: undefined}

  const [formAlert, setFormAlert] = useState<{
    severity?: AlertColor,
    content?: string
  }>(initialFormAlert)

  const initialFormData = {
    department: "", matriculationNumber: "",
    gender: "", staffRole: ""
  }

  const [formData, setFormData] = useState(initialFormData);

  const [formError, setFormError] = useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const [disableInput, setDisableInput] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  const reset = (): void => {
    resetFormAlert();
    resetFormError();
  }

  const resetFormAlert = (): void => {
    setFormAlert(initialFormAlert);
  };

  const resetFormError = (): void => {
    setFormError(initialFormData);
  };

  const handleFormData = (event: ChangeEvent<HTMLInputElement>): void => {
    reset()
    const {name, value} = event.target
    if (name === "staffRole") {
      formData.matriculationNumber = '';
    } else if (name === "matriculationNumber") {
      formData.staffRole = '';
    }
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    reset()
    setLoading(true)
    setDisableInput(true)


    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(formData)
    }).then(async (res) => {
      const {message, error} = await res.json() as ResponseReply

      if (res.status === 201) {
         if (typeof message === 'string') {
           message && setFormAlert({severity: 'success', content: message})
         }
        setLoading(false)
        setTimeout(() => {
          router.push('/en')
        }, 1000);
      } else {
        setLoading(false)
        // eslint-disable-next-line no-console -- I need it to debug
        console.log(error)
      }
    })
  }

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <Box
      sx={{
        ...BgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: IMAGE_PATH.concat('background/overlay_4.jpg'),
        }),
        height: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent='space-between'
        p={3}
      >
        <Logo/>

        {
          // TODO: Ensure while loading a random image from the avatar assets will show
        }
        <Avatar
          alt={`${user.name} avatar`}
          imgProps={{referrerPolicy: "no-referrer"}}
          src={user.picture}
        />

      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        pb={4}
        px={2}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {formAlert.content !== formAlert.severity && (
            <Alert severity={formAlert.severity} sx={{marginBottom: "16px"}}>
              <AlertTitle>
                <Typography sx={{textTransform: 'capitalize', fontWeight: 'fontWeightMedium'}}>
                  {formAlert.severity}
                </Typography>
              </AlertTitle>
              {formAlert.content}
            </Alert>
          )}
          <Typography mb={4} variant='h3'>Welcome {user.name}</Typography>
          <Typography mb={3}>
            Please fill this form to register to GradePal
          </Typography>

          <Box mb={4}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- form is fine */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>

                <FormControl variant="standard">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    disabled={disableInput}
                    label="Gender"
                    name="gender"
                    onChange={(e) => {
                      handleFormData(e as ChangeEvent<HTMLInputElement>)
                    }}
                    required
                    value={formData.gender}
                  >
                    <MenuItem value="female">
                      Female
                    </MenuItem>
                    <MenuItem value="male">
                      Male
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  disabled={disableInput}
                  error={formError.department !== ''}
                  helperText={formError.department}
                  label="Department"
                  name="department"
                  onChange={handleFormData}
                  required
                  type="text"
                  value={formData.department}
                />

              </Stack>
              <Tabs
                aria-label="register tab"
                onChange={handleTabChange}
                value={tabValue}
                variant="fullWidth"
              >
                <Tab label="Student"/>
                <Tab label="Staff"/>
              </Tabs>
              <TabPanel index={1} value={tabValue}>
                <Stack spacing={3}>

                  <TextField
                    disabled={disableInput}
                    error={formError.staffRole !== ''}
                    helperText={formError.staffRole}
                    label="Position"
                    name="staffRole"
                    onChange={handleFormData}
                    required
                    type="text"
                    value={formData.staffRole}
                  />

                </Stack>
              </TabPanel>
              <TabPanel index={0} value={tabValue}>

                <Stack spacing={3}>

                  <TextField
                    disabled={disableInput}
                    error={formError.matriculationNumber !== ''}
                    helperText={formError.matriculationNumber}
                    label="Matriculation Number"
                    name="matriculationNumber"
                    onChange={handleFormData}
                    required
                    type="text"
                    value={formData.matriculationNumber}
                  />

                </Stack>


              </TabPanel>


              <LoadingButton
                color="inherit"
                fullWidth
                loading={loading}
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </LoadingButton>
            </form>
          </Box>
        </Card>
      </Stack>
    </Box>
  );

}
