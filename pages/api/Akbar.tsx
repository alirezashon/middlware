// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'
// import {Browser , executablePath} from 'puppeteer'

// puppeteer.use(StealthPlugin())
// const URL = 'http://asset.mobinnet.net/Account/LDAPLogin'

// const main = async () => {
//     const browser: Browser = await puppeteer.launch({ headless: true, executablePath: executablePath() })
//     const page = await browser.newPage()
//     await page.goto(URL)

//     await page.type('#UserName','al.akbari')
//     await page.type('#Password','Argon&22')
//     await page.click('[type=input]')


//     await page.waitForTimeout(5000)
//     await browser.close()
// }














//   const buttonsText = await page.evaluate(() => {
//     const buttons = Array.from(document.querySelectorAll('.table'))
//     return buttons.map(button => button.textContent)
//   })
// main() 
//   return buttonsText
import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http://asset.mobinnet.net/Account/LDAPLogin'
const targetURL = 'http://asset.mobinnet.net/'

const main = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(loginURL)

  await page.type('#UserName', 'al.akbari')
  await page.type('#Password', 'Argon&22')
  await page.click('[type="submit"]')

  await page.waitForNavigation({ waitUntil: 'networkidle0' })
  await page.goto(targetURL)

  await browser.close()

}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const buttonTexts = await main()
    res.status(200).json({ message: 'Action performed successfully' })
  } catch (error) {
    console.error('Error performing action:', error)
    res.status(500).json({ error: 'Error performing action' })
  }
}

export default handler



// FormAssetFormView_AssetName
// FormAssetFormView_Text_Category
// FormAssetFormView_SerialNo
//div>a>span> FormAssetFormView_Status_chosen
// select2-FormAssetFormView_Owner-container
// FormAssetFormView_Text_Location



// import { NextApiRequest, NextApiResponse } from 'next'
// import puppeteer from 'puppeteer-extra'
// import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// puppeteer.use(StealthPlugin())

// const URL = 'http://asset.mobinnet.net/Account/LDAPLogin'

// const main = async () => {
//   const browser = await puppeteer.launch({ headless: true })
//   const page = await browser.newPage()
//   await page.goto(URL)

//   await page.type('#UserName', 'al.akbari')
//   await page.type('#Password', 'Argon&22')
//   await page.click('[type="submit"]')

//   await page.waitForTimeout(5000)
//   await browser.close()
// }

// const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await main()
//     res.status(200).json({ message: 'Action performed successfully' })
//   } catch (error) {
//     console.error('Error performing action:', error)
//     res.status(500).json({ error: 'Error performing action' })
//   }
// }

// export default handler
































// import { NextApiRequest, NextApiResponse } from "next"
// import cheerio from "cheerio"

// const URL = "http://asset.mobinnet.net/Account/MultiTenantLogin" // Replace with your desired URL

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Fetch the page
//     const response = await fetch(URL)
//     const html = await response.text()

//     // Load the HTML into Cheerio
//     const $ = cheerio.load(html)

//     // Extract the login URL from the button element
//     const loginUrl = $("#loginLink").attr("href")

//     // Make a new request to the login URL
//     const loginResponse = await fetch(`http://asset.mobinnet.net${loginUrl}`)
//     const loginHtml = await loginResponse.text()

//     // Load the login page HTML into Cheerio
//     const $login = cheerio.load(loginHtml)

//     // Extract the token from the form
//     const token = getFirstValue($login('input[name="__RequestVerificationToken"]').toArray())

//     // Extract the form action URL
//     const formAction = $login('form').attr('action')

//     // Set up the login payload
//     const loginPayload: Record<string, string> = {
//       __RequestVerificationToken: token || "",
//       CompanyName: "",
//       UserName: "al.akbari",
//       Password: "1234"
//     }

//     // Make a POST request to the login endpoint with the payload
//     const loginRequest = await fetch(`http://asset.mobinnet.net${formAction}`, {
//       method: "POST",
//       body: new URLSearchParams(loginPayload),
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       redirect: "manual" // Prevent automatic redirection
//     })

//     // Check if login was successful
//     if (loginRequest.status === 302) {
//       // Extract the cookies from the response
//       const cookies = loginRequest.headers.get("set-cookie")
//       const sessionId = getCookieValue(cookies, "ASP.NET_SessionId")

//       // Make subsequent requests with the session ID or cookies for authentication
//       const dataResponse = await fetch("http://asset.mobinnet.net/", {
//         headers: {
//           Cookie: cookies
//         }
//       })

//       // Extract the anchor tags or perform further actions as needed
//       const dataHtml = await dataResponse.text()
//       const $data = cheerio.load(dataHtml)
//       const anchorTags = $data("a")

//       // Return the anchor tags as the API response
//       res.status(200).json({ message: "Logged in successfully", anchorTags })
//     } else {
//       // Return an error message if login failed
//       res.status(401).json({ error: "Failed to log in" })
//     }
//   } catch (error) {
//     console.error("Error performing action:", error)
//     res.status(500).json({ error: "Error performing action" })
//   }
// }

// // Helper function to retrieve the first value from an array
// function getFirstValue(array: any[]) {
//   return array.length > 0 ? array[0] : null
// }

// // Helper function to extract the value of a specific cookie from the cookie header
// function getCookieValue(cookieHeader: string | null, cookieName: string) {
//   if (cookieHeader) {
//     const cookies = cookieHeader.split(";")
//     const cookie = cookies.find((c) => c.trim().startsWith(cookieName))
//     if (cookie) {
//       const match = cookie.match(new RegExp(`${cookieName}=([^;]+)`))
//       if (match) {
//         return match[1]
//       }
//     }
//   }
//   return null
// }