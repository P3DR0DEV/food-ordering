import * as Burnt from 'burnt'

function success({ title, message }: { title: string; message: string }) {
  Burnt.toast({
    title,
    preset: 'done',
    message,
  })
}

function error({ title, message }: { title: string; message: string }) {
  Burnt.toast({
    title,
    preset: 'error',
    message,
  })
}

export const toast = {
  success,
  error,
}
