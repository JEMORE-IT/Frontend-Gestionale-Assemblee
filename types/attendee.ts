export interface Attendee {
    id: number
    name: string
    status: 'Presente' | 'Assente' | 'Online' | 'Delega'
    assembly: number
}