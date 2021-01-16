import React, { useEffect } from 'react'
import { useLaunchesQuery } from '../../generated/graphql'
import { LinearProgress } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import Launch from './Launch'

interface Props {
    setLoader: (loader: boolean) => void
}

const LaunchContainer: React.FC<Props> = ({setLoader}) => {
    const { data, error, loading } = useLaunchesQuery()
    
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
        <>
          <Launch data={data} />  
        </>
    )
}

export default LaunchContainer
