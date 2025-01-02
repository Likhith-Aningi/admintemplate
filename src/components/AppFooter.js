import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://way2news.com" target="_blank" rel="noopener noreferrer">
          &copy; Way2News pvt ltd.
        </a>
        <span className="ms-1">
          GPS
        </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://likhith-aningi.github.io/me" target="_blank" rel="noopener noreferrer">
          Likhith
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
