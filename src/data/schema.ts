export type Usage = {
  owner: string
  status: string
  costs: number
  region: string
  stability: number
  lastEdited: string
}

export type OverviewData = {
  date: string
  "Conferences created": number
  "Papers submitted": number
  "Reviews completed": number
  Registrations: number
  "Authors registered": number
  "Reviewers assigned": number
  "Abstracts submitted": number
  "Support tickets": number
}
