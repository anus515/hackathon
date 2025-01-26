import React, { useState, useEffect } from "react"

interface Beneficiary {
  id: string
  name: String
  cnic: string
  purpose: string
  status: "Pending" | "In Progress" | "Completed"
}

// const DepartmentView = () => {
//   const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
//     { id: "1", name: "John Doe", cnic: "1234567890123", purpose: "Financial Aid", status: "Pending" },
//     { id: "2", name: "Jane Smith", cnic: "9876543210987", purpose: "Medical Assistance", status: "In Progress" },
//   ])


  // const handleStatusChange = (id: string, newStatus: "Pending" | "In Progress" | "Completed") => {
  //   setBeneficiaries((prevBeneficiaries) =>
  //     prevBeneficiaries.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
  //   )
  // }


  const DepartmentView = () => {
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  
    useEffect(() => {
      // Fetch beneficiaries from backend
      const fetchBeneficiaries = async () => {
        try {
          const response = await fetch("http://localhost:5000/beneficiaries");
          const data = await response.json();
          setBeneficiaries(data);
        } catch (error) {
          console.error("Error fetching beneficiaries:", error);
        }
      };
  
      fetchBeneficiaries();
    }, []);
  
    const handleStatusChange = async (id: string, newStatus: "Pending" | "In Progress" | "Completed") => {
      try {
        const response = await fetch(`http://localhost:5000/beneficiary/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
  
        if (response.ok) {
          const updatedBeneficiary = await response.json();
          setBeneficiaries((prevBeneficiaries) =>
            prevBeneficiaries.map((b) =>
              b.id === updatedBeneficiary.id ? updatedBeneficiary : b
            )
          );
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold mb-6">Department View</h2>
          <div className="space-y-4">
            {beneficiaries.map((beneficiary) => (
              <div key={beneficiary.id} className="border p-4 rounded-md">
                <h3 className="font-semibold">{beneficiary.name}</h3>
                <p>CNIC: {beneficiary.cnic}</p>
                <p>Purpose: {beneficiary.purpose}</p>
                <div className="mt-2">
                  <label htmlFor={`status-${beneficiary.id}`} className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id={`status-${beneficiary.id}`}
                    value={beneficiary.status}
                    onChange={(e) =>
                      handleStatusChange(beneficiary.id, e.target.value as "Pending" | "In Progress" | "Completed")
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <button
                  onClick={() => setSelectedBeneficiary(beneficiary)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedBeneficiary && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedBeneficiary.name}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">CNIC: {selectedBeneficiary.cnic}</p>
                <p className="text-sm text-gray-500">Purpose: {selectedBeneficiary.purpose}</p>
                <p className="text-sm text-gray-500">Status: {selectedBeneficiary.status}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setSelectedBeneficiary(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentView