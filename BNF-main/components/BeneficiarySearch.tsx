import type React from "react"
import { useState } from "react"

interface Beneficiary {
  id: string
  name: string
  cnic: string
  phone: string
  purpose: string
  status: string
}

const BeneficiarySearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Beneficiary[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call
    const mockResults: Beneficiary[] = [
      {
        id: "1",
        name: "John Doe",
        cnic: "1234567890123",
        phone: "03001234567",
        purpose: "Financial Aid",
        status: "Completed",
      },
      {
        id: "2",
        name: "Jane Smith",
        cnic: "9876543210987",
        phone: "03009876543",
        purpose: "Medical Assistance",
        status: "In Progress",
      },
    ]
    setSearchResults(
      mockResults.filter(
        (b) =>
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.cnic.includes(searchTerm) ||
          b.phone.includes(searchTerm),
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold mb-6">Search Beneficiaries</h2>
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, CNIC, or phone"
                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>
          <div className="space-y-4">
            {searchResults.map((beneficiary) => (
              <div key={beneficiary.id} className="border p-4 rounded-md">
                <h3 className="font-semibold">{beneficiary.name}</h3>
                <p>CNIC: {beneficiary.cnic}</p>
                <p>Phone: {beneficiary.phone}</p>
                <p>Purpose: {beneficiary.purpose}</p>
                <p>Status: {beneficiary.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeneficiarySearch

