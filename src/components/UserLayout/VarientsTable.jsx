import React from 'react'
import '../../assets/styles/UserStyle.css';
export default function VarientsTable() {
  return (
    <section className="table-section" id="variant">
        <table>
          <caption>Swift Petrol Variants</caption> 
          <tbody>
            <tr>
              <td className="title">LXI</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> Manual
              </td>
              <td className="data">₹ 5.19 Lakh</td>
            </tr>
            <tr>
              <td className="title">VXI</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> Manual
              </td>
              <td className="data">₹ 6.19 Lakh</td>
            </tr>
            <tr>
              <td className="title">VXI AMT</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> A Auto
              </td>
              <td className="data">₹ 6.66 Lakh</td>
            </tr>
            <tr>
              <td className="title">ZXI</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> Manual
              </td>
              <td className="data">₹ 6.78 Lakh</td>
            </tr>
            <tr>
              <td className="title">ZXI AMT</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> A Auto
              </td>
              <td className="data">₹ 7.25 Lakh</td>
            </tr>
            <tr>
              <td className="title">ZXI+</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> Manual
              </td>
              <td className="data">₹ 7.58 Lakh</td>
            </tr>
            <tr>
              <td className="title">ZXI+ AMT</td>
              <td className="title">
                <i className="fa fa-bolt" aria-hidden="true"></i> 1197cc
              </td>
              <td className="title">
                <i className="fa fa-cogs" aria-hidden="true"></i> A Auto
              </td>
              <td className="data">₹ 8.02 Lakh</td>
            </tr>
          </tbody>
        </table>
        <table>
          <caption>Price in Popular City</caption>
          <tbody>
            <tr>
              <td className="title">Ahmedabad</td>
              <td className="data">₹ 5.19 - 8.02 Lakh</td>
            </tr>
            <tr>
              <td className="title">Delhi</td>
              <td className="data">₹ 5.67 - 8.93 Lakh</td>
            </tr>
            <tr>
              <td className="title">Mumbai</td>
              <td className="data">₹ 6.07 - 9.29 Lakh</td>
            </tr>
            <tr>
              <td className="title">Pune</td>
              <td className="data">₹ 6.09 - 9.33 Lakh</td>
            </tr>
            <tr>
              <td className="title">Chennai</td>
              <td className="data">₹ 5.97 - 9.15 Lakh</td>
            </tr>
            <tr>
              <td className="title">Kolkata</td>
              <td className="data">₹ 5.74 - 8.8 Lakh</td>
            </tr>
          </tbody>
        </table>
      </section>
  )
}
