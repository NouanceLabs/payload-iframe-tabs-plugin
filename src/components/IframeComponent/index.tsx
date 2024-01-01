import React, { Fragment, useEffect, useState } from 'react'
import { useStepNav } from 'payload/dist/admin/components/elements/StepNav'
import { useDocumentInfo } from 'payload/dist/admin/components/utilities/DocumentInfo'
import type { AdminViewComponent, AdminViewProps } from 'payload/config'
import { Label, useField, useFormFields } from 'payload/components/forms'
import { Gutter } from 'payload/dist/admin/components/elements/Gutter'
import { TabConfig } from '../../types'

const IframeComponent: React.FC<AdminViewProps> = ({ user }) => {
  const { setStepNav } = useStepNav()
  const { collection, global } = useDocumentInfo()
  const [tab, setTab] = useState<TabConfig>()

  const field = useFormFields(([fields, dispatch]) => {
    if (tab && 'watchField' in tab) {
      return fields[tab.watchField]
    }
    return null
  })

  useEffect(() => {
    if (tab?.label) {
      setStepNav([
        {
          label: tab.label,
        },
      ])
    }
  }, [setStepNav, tab])

  useEffect(() => {
    if (window) {
      const pathname = window.location.pathname

      if (collection) {
        Object.entries(collection.custom['iframesTabPlugin'])?.forEach(([key, value]) => {
          if (pathname.includes(key)) {
            // @ts-expect-error
            setTab(value)
          }
        })
      } else if (global) {
        Object.entries(global.custom['iframesTabPlugin'])?.forEach(([key, value]) => {
          if (pathname.includes(key)) {
            // @ts-expect-error
            setTab(value)
          }
        })
      }
    }
  }, [])

  return (
    <Gutter className={`iframePluginComponent`}>
      {tab && 'src' in tab && <iframe src={tab.src} {...tab.iframeProps} />}
      {tab && 'watchField' in tab && Boolean(field?.value) && (
        <iframe src={String(field?.value)} {...tab.iframeProps} />
      )}
      {tab && 'code' in tab && <div dangerouslySetInnerHTML={{ __html: tab.code }}></div>}
    </Gutter>
  )
}

export default IframeComponent
