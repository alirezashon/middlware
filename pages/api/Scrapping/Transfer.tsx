/** @format */

// DATA SAMPLE
// const data = [{assetCode:value, city:value, contractor:value '}]

import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())
interface AssetData {
	AssetCode: string
	City: string
	Agent: string
}
const main = async (data: AssetData[]) => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(`${process.env.ASSET_URL}`)

	await page.click('.fa-chevron-down', { delay: 777 })
	await page.type('#UserName', `${process.env.ASSET_USER}`)
	await page.type('#Password', `${process.env.ASSET_PASS}`)
	await page.click('button[class="btn btn-block btn-cta-primary"]')

	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	await page.waitForTimeout(1000)

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

	const assetCodes = data.map((asset) => asset.AssetCode).join(',')
	await page.type('.FormAssetCustomFilterViewCustomSearch', assetCodes)
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.click('a[class="chosen-single"]')
	await page.type('div[class="chosen-search"] input', 'Agent Name')
	await page.waitForTimeout(3000)

	await page.keyboard.press('Enter')

	await page.screenshot({ path: './modified_page.png' })

	// Evaluate a function in the browser context to change the text
	await page.evaluate(() => {
		const spanElement = document.querySelector('span')
		if (spanElement) {
			spanElement.textContent = 'Ali'
		}
	})

	await page.click('.chosen-container-active')
	await page.type(
		'chosen-single[span]',
		'پیشگامان سخت افزار تیراژه'
	)
	await page.keyboard.press('Enter')

	await page.waitForSelector('.AssetTrackerFileColumn')

	await new Promise((resolve) => setTimeout(resolve, 8000))
	await page.waitForSelector('.select-checkbox')
	await page.click('.select-checkbox')
	/////A//I/N/A/A//I/N/A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// await page.setDefaultTimeout(3000)
	await page.waitForTimeout(3000)
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
	await page.keyboard.press('Enter')
}
const waitForTimeout = async (milliseconds: number): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const data = [
			{
				AssetCode: 'AST2023336033',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2022204888',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2022306419',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2022306532',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2022306533',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2022306547',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2023333530',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2023341263',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2023344271',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
			{
				AssetCode: 'AST2023340596',
				City: 'Tehran',
				Agent: 'پیشگامان سخت افزار تیراژه',
			},
		]
		await main(data)
		await waitForTimeout(5000) // Wait for 5 seconds before responding

		res.status(200).json({ message: 'Action performed successfully' })
	} catch (error) {
		console.error('Error performing action:', error)
		res.status(500).json({ error: 'Error performing action' })
	}
}
export default handler
