/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

<<<<<<< HEAD
=======
const loginURL = 'http:/'
const targetURL = 'http:/'

>>>>>>> 6e32b5bbadfab291013f647385f310241871822e
const main = async () => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(`${process.env.ASSET_URL}`)

<<<<<<< HEAD
	await page.type('#UserName', `${process.env.ASSET_USER}`)
	await page.type('#Password', `${process.env.ASSET_PASS}`)
	await page.click('button[type="submit"]')
	await page.waitForTimeout(1000)
=======
	await page.type('#UserName', '')
	await page.type('#Password', '')
	await page.click('[type="submit"]')
>>>>>>> 6e32b5bbadfab291013f647385f310241871822e

	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	// Extract the token from the response or cookies
	const response = await page.waitForResponse((res) =>
		res.url().includes('login_success')
	) // Replace 'login_success' with the URL that indicates successful login
	const token = await response.json() // Assuming the response is in JSON format and contains the token

	// Use the extracted token to make authenticated requests
	// For example, you can include the token in the URL of the new page you want to navigate to
	const targetUrlWithToken = `${process.env.ASSET_TARGET}?token=${token}` // Replace 'token' with the name of the parameter used in the URL
	await page.goto(targetUrlWithToken)

	await page.waitForSelector('.AddPlus')
	await page.click('.AddPlus')

	await page.evaluate(() => {
		history.pushState(
			'',
			document.title,
			window.location.pathname + window.location.search
		)
	})

	await page.waitForSelector('.FormAssetCustomFilterViewCustomSearch')
	await page.type(
		'.FormAssetCustomFilterViewCustomSearch',
		'AST2023336033,AST2022204888,AST2022306419,AST2022306532,AST2022306533,AST2022306547,AST2023333530,AST2023341263,AST2023344271,AST2023340596'
	)
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')

	await new Promise((resolve) => setTimeout(resolve, 8000))
	await page.waitForSelector('.select-checkbox')
	await page.click('.select-checkbox')

	await page.waitForTimeout(3000)

	await page.click('.btn-assettransfer')

	await page.waitForTimeout(3000)
	await page.waitForSelector('#FormAssetCheckTransferFormView_StatusId_chosen')
	await page.click('#FormAssetCheckTransferFormView_StatusId_chosen')

	await page.waitForSelector('.chosen-single span')
	await page.type('.chosen-single span', 'Contractor---Intact')
	await page.keyboard.press('Tab')

	await page.type('#FormAssetCheckTransferFormView_Text_LocationId', 'Tehran')
	await page.waitForTimeout(3000)
	await page.keyboard.press('Tab')
	await page.keyboard.press('Tab')
	await page.keyboard.press('Tab')
	await page.keyboard.press('Tab')
	await page.keyboard.press('Enter')
	await page.keyboard.press('Enter')
	await page.keyboard.press('Enter')

	await page.click(
		'span[aria-labelledby="select2-FormAssetTransferFormView_Employee-container"]'
	)
	await page.type(
		'.select2-search--dropdown input[class="select2-search__field"]',
		'Contractor (Contractor@test.ir)'
	)
	await page.waitForTimeout(2222)

	await page.keyboard.press('Enter')
	await page.waitForTimeout(3333)
	await page.click(
		'span[aria-labelledby="select2-FormAssetCheckTransferFormView_PartnerId-container"]'
	)
	await page.type(
		'.select2-search--dropdown input[class="select2-search__field"]',
		'پیشگامان سخت افزار تیراژه'
	)
	await page.waitForTimeout(2222)


const waitForTimeout = async (milliseconds: number): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		await main()
		await waitForTimeout(5000) // Wait for 5 seconds before responding

		res.status(200).json({ message: 'Action performed successfully' })
	} catch (error) {
		console.error('Error performing action:', error)
		res.status(500).json({ error: 'Error performing action' })
	}
}

export default handler