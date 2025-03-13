import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/check-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/check-in/"!</div>
}
