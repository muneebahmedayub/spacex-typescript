import React from 'react'

import { LaunchesQuery } from '../../generated/graphql'

import { Card, CardContent, Grid, Typography, Button, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'


import { Link } from 'react-router-dom'

interface Props {
    data: LaunchesQuery
}

const Launch: React.FC<Props> = ({ data }) => {

    const theme = useTheme()
    const medium = useMediaQuery(theme.breakpoints.up('md'))
    const extraSmall = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <div>
            <Grid container spacing={3} justify='center'>
                {!!data.launches && data.launches.map((launch, index) => (
                    <Grid item md={10} xs={12} key={index}>
                        <Card style={{ backgroundColor: '#2f2f30' }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant={extraSmall ? 'h5' : 'h4'} style={{ color: '#919292' }}>
                                            {launch?.flight_number}.
                                            Mission: <span style={{ color: `${launch?.launch_success ? '#77b309' : '#ca3732'}` }}>
                                                {launch?.mission_name}
                                            </span>
                                        </Typography>
                                        <Typography variant='body1' style={{ color: '#919292' }}> Date: {launch?.launch_date_local} </Typography>
                                    </Grid>
                                    <Grid container item xs={12} md={6} justify={medium ? 'center' : 'flex-start'} alignItems='center'>
                                        <Link to={`/launch/${launch?.flight_number}`} style={{textDecoration: 'none'}}>
                                            <Button variant='contained' style={{ backgroundColor: '#605f5d' }} >Details</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Launch
