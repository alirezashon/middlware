/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import { ElementHandle } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http://asset.mobinnet.net/Account/LDAPLogin'
const targetURL = 'http://asset.mobinnet.net/'

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

	await page.waitForSelector('.FormAssetCustomFilterViewCustomSearch') // Wait for the button action to complete, adjust the timeout value as needed
	await page.type('.FormAssetCustomFilterViewCustomSearch', 'AST2023344271')
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')
	await page.waitForTimeout(3000) // Wait for any additional tasks to complete
	await page.select('select[name="AssetGridView_length"]', '1000')

	const selectValue = await page.$eval(
		'select[name="AssetGridView_length"]',
		(select) => select.value
	)
	if (selectValue === '1000') {
		await new Promise((resolve) => setTimeout(resolve, 5000))
		await page.click('.select-checkbox')
	}

	// await page.click('.btn-assettransfer')

	// await browser.close()
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const spanTexts = await main()
		res.status(200).json({ message: 'Action performed successfully' })
	} catch (error) {
		console.error('Error performing action:', error)
		res.status(500).json({ error: 'Error performing action' })
	}
}

export default handler
