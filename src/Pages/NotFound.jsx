import { Flex } from '@mantine/core'
import React from 'react'
import SupportiveLogo from './utils/SupportiveLogo'

export default function NotFound() {
  return (
    <Flex direction={'column'} justify={'center'} align={'center'}>
        <SupportiveLogo/>
        404.NotFound
    </Flex>
  )
}
