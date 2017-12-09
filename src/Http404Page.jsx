import React from 'react'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'

export default function () {
  return (
    <Box pad="large" align="center">
      <Heading>404 Page Not Found</Heading>
      <Button href="/" label="Back to home" primary />
    </Box>
  )
}
