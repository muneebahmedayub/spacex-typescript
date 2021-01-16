import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLaucnhesDetailsQuery } from '../../generated/graphql'

import { LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import LaunchDetails from './LaunchDetails'

interface Props {
    setLoader: (loader: boolean) => void
}

const LaunchDetailsContainer: React.FC<Props> = ({setLoader}) => {
    const { flightNumber } = useParams()

    const { data, error, loading } = useLaucnhesDetailsQuery({ variables: { id: flightNumber } })

    useEffect(() => {
        setLoader(loading)
    }, [loading])

    if (loading) {
        return null
    }
    else if (error || !data) {
        return (
            <Alert severity='error' variant='outlined'>
                <AlertTitle color='error'>Error</AlertTitle>
                There was an error please try again
            </Alert>
        )
    }

    return (
        <div>
            <LaunchDetails data={data} />
        </div>
    )
}

export default LaunchDetailsContainer
