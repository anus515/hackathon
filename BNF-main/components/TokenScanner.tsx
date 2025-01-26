import type React from "react"
import { useState } from "react"

interface TokenData {
  id: string
  beneficiaryName: string
  cnic: string
  purpose: string
  department: string
  status: string
}

const TokenScanner = () => {
  const [tokenId, setTokenId] = useState("")
  const [tokenData, setTokenData] = useState<TokenData | null>(null)

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call
    const mockTokenData: TokenData = {
      id: tokenId,
      beneficiaryName: "John Doe",
      cnic: "1234567890123",
      purpose: "Financial Aid",
      department: "Finance",
      status: "Pending",
    }
    setTokenData(mockTokenData)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold mb-6">Token Scanner</h2>
          <form onSubmit={handleScan} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter token ID"
                className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Scan
              </button>
            </div>
          </form>
          {tokenData && (
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold">{tokenData.beneficiaryName}</h3>
              <p>CNIC: {tokenData.cnic}</p>
              <p>Purpose: {tokenData.purpose}</p>
              <p>Department: {tokenData.department}</p>
              <p>Status: {tokenData.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenScanner

