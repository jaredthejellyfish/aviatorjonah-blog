import React from 'react'
import { toast } from 'sonner'

import { Button } from './ui/button'

type Props = {}

function Toast({}: Props) {
  return <Button onClick={() => toast('Toast')}>Toast</Button>
}

export default Toast
