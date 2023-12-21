"use client"
import {Container, Grid,} from '@mui/material'
import type {ReactNode} from "react";
import {ConversionRates, CurrentSubject, WidgetSummary} from '@components/widgets'
import type {UsersInterface} from "@components/interface";

interface Parameters {
  user: UsersInterface
}

export function StaffPage({}: Parameters): ReactNode {

  return (
    <Container maxWidth="xl">


      <Grid container spacing={3}>
        <Grid item md={3} sm={6} xs={12}>
          <WidgetSummary
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png"/>}
            title="Weekly Sales"
            total={714000}
          />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <WidgetSummary
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png"/>}
            title="Students"
            total={1352831}
          />
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <WidgetSummary
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png"/>}
            title="Staffs"
            total={1352831}
          />
        </Grid>


        <Grid item lg={8} md={6} xs={12}/>

        <Grid item lg={4} md={6} xs={12}/>

        <Grid item lg={8} md={6} xs={12}>
          <ConversionRates
            chart={{
              series: [
                {label: 'Italy', value: 400},
                {label: 'Japan', value: 430},
                {label: 'China', value: 448},
                {label: 'Canada', value: 470},
                {label: 'France', value: 540},
                {label: 'Germany', value: 580},
                {label: 'South Korea', value: 690},
                {label: 'Netherlands', value: 1100},
                {label: 'United States', value: 1200},
                {label: 'United Kingdom', value: 1380},
              ],
            }}
            subheader="(+43%) than last year"
            title="Conversion Rates"
          />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <CurrentSubject
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                {name: 'Series 1', data: [80, 50, 30, 40, 100, 20]},
                {name: 'Series 2', data: [20, 30, 40, 80, 20, 80]},
                {name: 'Series 3', data: [44, 76, 78, 13, 43, 10]},
              ],
            }}
            title="Current Subject"
          />
        </Grid>
      </Grid>

    </Container>
  )
}
