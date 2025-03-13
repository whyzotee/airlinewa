import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/flight-status/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/flight-status/"!</div>
}
