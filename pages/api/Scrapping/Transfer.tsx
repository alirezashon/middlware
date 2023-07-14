/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http:/'
const targetURL = 'http:/'

const main = async () => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(loginURL)

	await page.type('#UserName', 'al.akbari')
	await page.type('#Password', 'Argon&22')
	await page.click('[type="submit"]')

	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	await page.goto(targetURL)

	await page.waitForSelector('.AddPlus')
	await page.click('.AddPlus')

	await page.waitForSelector('.FormAssetCustomFilterViewCustomSearch')
	await page.type(
		'.FormAssetCustomFilterViewCustomSearch',
		'AST2023336033,AST2022204888,AST2022306419,AST2022306532,AST2022306533,AST2022306547,AST2023333530,AST2023341263,AST2023344271,AST2023340596'
	)
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')

	await new Promise((resolve) => setTimeout(resolve, 6000))
	await page.waitForSelector('.select-checkbox')
	await page.click('.select-checkbox')

	await page.click('.btn-assettransfer')

	// await page.click('.chosen-search')
	// await page.type('.chosen-search input', 'Contractor---Intact')
	await page.waitForTimeout(3000)
	await page.waitForSelector('.chosen-single')
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

	await page.waitForTimeout(3333)
	
	await page.click('#AllotedTo_transfer .select2-selection__rendered')
await page.evaluate(() => {
	const parentElements = document.querySelectorAll(
		'#AllotedTo_transfer'
	)

	parentElements.forEach((parentElement) => {
		const selectElement = parentElement.querySelector(
			'select[name="Employee"]'
		) as HTMLSelectElement | null

		if (selectElement) {
			selectElement.value = '3107'
			const event = new Event('change', { bubbles: true })
			selectElement.dispatchEvent(event)
		}
		
	})
})

	
	}

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
