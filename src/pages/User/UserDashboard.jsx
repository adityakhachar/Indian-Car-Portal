import React from 'react'
import Navbar from '../../components/UserLayout/Navbard'
import Footer from '../../components/UserLayout/Footer'
import '../../assets/styles/UserStyle.css'; // Import the external CSS file

export default function UserDashboard() {
  return (
    <>
    <div><Navbar/></div>
    <div><>
	<header class="banner">
		<div class="title">
			<p>We are India's #1 Auto Portal Website for Cars.</p>
			<h3>Thank You For Visit.</h3>
		</div>


	</header>
    </>
    </div>
    <div>
      {/* Other content of your application */}
      <Footer />
    </div>
    </>
  )
}
