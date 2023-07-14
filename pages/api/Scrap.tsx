import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http://'
const targetURL = 'http://'

const main = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(loginURL)

  await page.type('#UserName', '')
  await page.type('#Password', '')
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


