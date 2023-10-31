import { context } from "@budibase/backend-core"
import { isTableId } from "@budibase/backend-core/src/docIds"
import {
  DatabaseQueryOpts,
  LinkDocument,
  LinkDocumentValue,
} from "@budibase/types"
import { ViewName, getQueryIndex } from "../../../../src/db/utils"

export async function fetch(tableId: string): Promise<LinkDocumentValue[]> {
  if (!isTableId(tableId)) {
    throw new Error(`Invalid tableId: ${tableId}`)
  }

  const db = context.getAppDB()
  const params: DatabaseQueryOpts = {
    startkey: [tableId],
    endkey: [tableId, {}],
  }
  const linkRows = (await db.query(getQueryIndex(ViewName.LINK), params)).rows
  return linkRows.map(row => row.value as LinkDocumentValue)
}

export async function fetchWithDocument(
  tableId: string
): Promise<LinkDocument[]> {
  if (!isTableId(tableId)) {
    throw new Error(`Invalid tableId: ${tableId}`)
  }

  const db = context.getAppDB()
  const params: DatabaseQueryOpts = {
    startkey: [tableId],
    endkey: [tableId, {}],
    include_docs: true,
  }
  const linkRows = (await db.query(getQueryIndex(ViewName.LINK), params)).rows
  return linkRows.map(row => row.doc as LinkDocument)
}
