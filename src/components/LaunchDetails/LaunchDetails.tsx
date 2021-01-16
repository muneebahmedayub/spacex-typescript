import React from 'react'
import { LaucnhesDetailsQuery } from '../../generated/graphql'

import { Divider, Typography, Grid, Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import { Link } from 'react-router-dom'

interface Props {
    data: LaucnhesDetailsQuery
}

const LaunchDetails: React.FC<Props> = ({ data }) => {

    const { launch } = data

    const embedHandler = (link: string, from: string, to: string) => {
        return link.replace(from, to)
    }
    let link: string = ''

    if (launch?.links?.video_link) {
        link = embedHandler(launch?.links?.video_link, 'watch?v=', 'embed/')
    }

    return (
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}> <Button variant='contained' style={{ backgroundColor: '#605f5d' }}>Back</Button> </Link>
            <Typography variant='h3'>Launch Details: </Typography>
            <Divider style={{ backgroundColor: 'white' }} />
            <Typography gutterBottom>Mission Name: {launch?.mission_name} </Typography>
            <Typography gutterBottom>Flight Number: {launch?.flight_number} </Typography>
            <Typography gutterBottom> Launch Date: {launch?.launch_date_local} </Typography>
            <Typography gutterBottom> Launch Success: <span style={{ color: launch?.launch_success ? '#77b309' : '#ca3732' }}> {launch?.launch_success ? 'Yes' : 'No'} </span> </Typography>
            <Typography gutterBottom> Launch Site: {launch?.launch_site?.site_name} </Typography>
            <Typography gutterBottom> Details: {launch?.details} </Typography>

            <Typography variant='h3'>Rocket Details: </Typography>
            <Divider style={{ backgroundColor: 'white' }} />
            <Typography gutterBottom> Rocket Name: {launch?.rocket?.rocket_name} </Typography>
            <Typography gutterBottom> Rocket Type: {launch?.rocket?.rocket_type} </Typography>

            <Typography variant='h3'>Images: </Typography>
            <Divider style={{ backgroundColor: 'white' }} />
            <Grid container spacing={3}>
                {!launch?.links?.flickr_images?.length ?
                    <Grid item xs={12}>
                        <Alert severity='info' variant='outlined'>
                            <AlertTitle>Images Not found</AlertTitle>
                            There is no image to show here
                        </Alert>
                    </Grid>
                    :
                    launch?.links?.flickr_images?.map((image, index) => {
                        if (!image) return null
                        return (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                                <img className='images' width='100%' src={image} alt="" />
                            </Grid>
                        )
                    })}
            </Grid>

            <Typography variant='h3' style={{ marginTop: 20 }}>Video: </Typography>
            <Divider style={{ backgroundColor: 'white' }} />
            {!launch?.links?.video_link ?
                <Alert severity='error' variant='outlined'>
                    <AlertTitle color='error'>Error</AlertTitle>
                    There is no video for this mission
                </Alert>
                :
                <>
                    <Typography>If Video not working than click <a href={launch?.links?.video_link} target='blank'>here</a></Typography>
                    <iframe width="100%" height='600' src={link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </>
            }
        </div>
    )
}

export default LaunchDetails
