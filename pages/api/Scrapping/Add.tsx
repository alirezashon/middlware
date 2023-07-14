import { NextApiRequest, NextApiResponse } from 'next'
import { ElementHandle } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http:'
const targetURL = 'http:'

const main = async () => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(loginURL)

	await page.type('#UserName', '')
	await page.type('#Password', '')
	await page.click('[type="submit"]')

	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	await page.goto(targetURL)

	await page.waitForSelector('.btn-asset')
	await page.click('.btn-asset')

	await page.waitForSelector('a[onclick="FormAssetFormViewHeaderClick();"]') // Wait for the button action to complete, adjust the timeout value as needed
	await page.click('a[onclick="FormAssetFormViewHeaderClick();"]')

	await page.waitForSelector('#FormImportAssetFormView_UploadFile')
	const [fileChooser] = await Promise.all([
		page.waitForFileChooser(),
		page.click('#FormImportAssetFormView_UploadFile'),
	])
	await fileChooser.accept(['C:\\Users\\al.akbari\\Desktop\\alireza.csv'])

	await page.waitForTimeout(6000) // Wait for any additional tasks to complete

	await page.waitForSelector('#FormImportAssetFormViewbtnSave')
	await page.click('#FormImportAssetFormViewbtnSave')

	await page.waitForSelector('.analysis-icon.complete') // Wait for the analysis to be completed
	await page.waitForTimeout(3000) // Wait for any additional tasks to complete

	const spanTexts = await page.evaluate(() => {
		const spans = Array.from(document.querySelectorAll('label'))
		return spans.map((span) => span.textContent)
	})

	await browser.close()

	return spanTexts
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const spanTexts = await main()
		res
			.status(200)
			.json({ message: 'Action performed successfully', spanTexts })
	} catch (error) {
		console.error('Error performing action:', error)
		res.status(500).json({ error: 'Error performing action' })
	}
}

export default handler


