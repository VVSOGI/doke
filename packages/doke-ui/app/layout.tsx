import { Metadata } from 'next'
import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'
import { ActiveSectionProvider, EndpointsDataProvider } from '@/contexts'
import { Sidebar } from '@/components'
import { loadApiSchema, loadProjectData } from '@/lib/utils/load'
import './globals.css'

export interface CustomIconDescriptorType extends IconDescriptor {
  precedence?: string
}

const icon: CustomIconDescriptorType = {
  rel: 'stylesheet',
  url: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
  precedence: 'default'
}

export const metadata: Metadata = {
  icons: {
    other: icon
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const projects = await loadProjectData()
  const data = []
  for (const route of projects.routes) {
    data.push(await loadApiSchema(route))
  }

  return (
    <html lang="en">
      <body>
        <div className="flex">
          <ActiveSectionProvider>
            <EndpointsDataProvider endpointData={data}>
              <Sidebar />
            </EndpointsDataProvider>
            <main className="flex-1">{children}</main>
          </ActiveSectionProvider>
        </div>
      </body>
    </html>
  )
}
