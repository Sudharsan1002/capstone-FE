import React from 'react'

function Footer() {
    return (
      <div>
        <footer className="bg-slate-400 rounded-md text-center py-4">
          © {new Date().getFullYear()} Counseling Platform. All rights reserved.
        </footer>
      </div>
    );
}

export default Footer