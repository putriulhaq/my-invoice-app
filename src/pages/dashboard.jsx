import React, { Component } from 'react';

function Dashboard() {
    return ( 
    <>
    <div className="container flex flex-row min-w-full">
        <div className="flex w-full flex-row gap-5">
          {/* Bagian kiri */}
          <div className="w-full md:mb-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Dashboard Bagian Kiri</h2>
              {/* Isi konten bagian kiri */}
            </div>
          </div>
          
          {/* Bagian kanan */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Dashboard Bagian Kanan</h2>
              {/* Isi konten bagian kanan */}
            </div>
          </div>
        </div>
      </div>

    </> );
}

export default Dashboard;