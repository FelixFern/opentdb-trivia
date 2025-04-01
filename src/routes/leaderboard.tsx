import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leaderboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center relative">
      <>
        Hello "/leaderboard"!
      </>
    </div>
  )
}
