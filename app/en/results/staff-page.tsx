/* eslint-disable @typescript-eslint/no-misused-promises -- need to use async function */
// noinspection JSUnusedGlobalSymbols

"use client"
import type {SelectChangeEvent} from "@mui/material";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import type {ReactNode} from 'react';
import React, {useState} from 'react';
import {Iconify} from '@components/iconify';
import {HandleTable} from '@layouts/table';
import type {FormAlert, ResultsInterface} from "@components/interface";
import {AllModelsEnum, ProgressState} from "@components/interface";
import {useEdgeStore} from '@components/edgeStore';
import type {FileState} from "@components/dropzone";
import {SingleFileDropzone} from "@components/dropzone";
import {populateSession} from '@components/populate'

interface FormDataType {
  session: string | null;
}

export function StaffPage({ results }: {results: ResultsInterface[]}): ReactNode {

  const { edgestore } = useEdgeStore();

  const initialFormAlert: FormAlert = { severity: undefined, content: "" }

  const initialFormData: FormDataType = { session: null }

  const [formData, setFormData] = useState<FormDataType>(initialFormData)

  const [formAlert, setFormAlert] = useState<FormAlert>(initialFormAlert);

  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const [openDialog, setOpenDialog] = useState(false);

  const updateFileProgress = (key: string, progress: FileState['progress']): void => {
    setFileStates((_fileStates) => {
      const newFileStates = structuredClone(_fileStates);
      const fileState = newFileStates.find(
        (f) => f.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleFileChange = async (addedFiles: FileState[]): Promise<void> => {
    if (formData.session === null) {
      setFormAlert({
        severity: 'error',
        content: "Pick a session first"
      })
    }
    setFileStates([...fileStates, ...addedFiles]);
    await Promise.all(
      addedFiles.map(async (addedFileState): Promise<void> => {
        try {
          await edgestore.resultExcelfiles.upload({
            file: addedFileState.file,
            onProgressChange: (progress): void => {
              updateFileProgress(addedFileState.key, progress);
              if (progress === 100) {
                // wait 1 second to set it to complete
                // so that the user can see the progress bar at 100%
                setTimeout(() => {
                  updateFileProgress(addedFileState.key, ProgressState.COMPLETE);

                },
                  1000);
              }
            },
          })
            .then(async (res): Promise<void> => {
              await fetch('/api/results', {
                method: 'POST',
                body: JSON.stringify({ ...res, ...formData })
              })
            })
            ;
        } catch (err) {
          updateFileProgress(addedFileState.key, ProgressState.ERROR);
        }
      }),
    );
  }

  const handleDialog = (): void => {
    setOpenDialog(!openDialog)
  }

  const handleFormData = (event: SelectChangeEvent): void => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Box>
      <Stack alignItems='center' direction='row' justifyContent='space-between' mb={5}>
        <Typography variant='h3'>Results</Typography>

        <Button
          aria-haspopup="true"
          color='inherit'
          onClick={handleDialog}
          startIcon={<Iconify icon='eva:plus-fill' />}
          variant='contained'
        >
          Add Result
        </Button>
      </Stack>

      <Dialog onClose={handleDialog} open={openDialog}>

        {formAlert.severity !== undefined && (
          <Alert severity={formAlert.severity}>
            <AlertTitle>
              <Typography sx={{ textTransform: 'capitalize', fontWeight: 'fontWeightMedium' }}>
                {formAlert.severity}
              </Typography>
            </AlertTitle>
            {formAlert.content}
          </Alert>
        )}

        <DialogTitle>Add New Results</DialogTitle>
        { }
        <DialogContent>
          <DialogContentText>
            Please fill this form, upload an excel result sheet and submit to add results.
            Note this is to add a multiple result and it should follow the accepted format.
            To view the format click <a href="format">here</a>.
          </DialogContentText>
          <Stack spacing={3}>
            {
              // Session Select
            }
            <FormControl variant="standard">
              <InputLabel id="sessionLabel">Session</InputLabel>
              <Select
                label="Session"
                labelId="sessionSelectLabelId"
                name="session"
                onChange={handleFormData}
                required
                value={formData.session ?? ''}
              >
                <MenuItem key="_session_none" value="">
                  <em>None</em>
                </MenuItem>
                {populateSession.reverse().map((item) => (
                  <MenuItem key={item.key} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SingleFileDropzone
              onFilesAdded={handleFileChange}
              value={fileStates}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            color='inherit'
            onClick={handleDialog}
            sx={{
              mb: 2, mr: 2
            }}
            variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <HandleTable
        data={results}
        headLabel={[
          { id: 'matriculationNumber', label: 'Matriculation Number' },
          { id: 'numberOfResults', label: 'Number Of Results' },
        ]}
        initialOrder="matriculationNumber"
        modelType={AllModelsEnum.Results}
      />

    </Box>
  )
}

