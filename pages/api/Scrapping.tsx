/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import { ElementHandle } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http://Login'
const targetURL = 'http://'

const main = async () => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(loginURL)

	await page.type('#UserName', '')
	await page.type('#Password', '')
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





import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const loginURL = 'http://LDAPLogin'
const targetURL = 'http://'

const main = async () => {
	const browser = await puppeteer.launch({ headless: false }) // Open a visible browser window
	const page = await browser.newPage()
	await page.goto(loginURL)

	await page.type('#UserName', '')
	await page.type('#Password', '')
	await page.click('[type="submit"]')

	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	await page.goto(targetURL)

	await page.waitForSelector('.AddPlus')
	await page.click('.AddPlus')

	await page.waitForSelector('.FormAssetCustomFilterViewCustomSearch') // Wait for the button action to complete, adjust the timeout value as needed
	await page.type(
		'.FormAssetCustomFilterViewCustomSearch',
		'AST2023336033,AST2022204888,AST2022306419,AST2022306532,AST2022306533,AST2022306547,AST2023333530,AST2023341263,AST2023344271,AST2023340596')
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')
	// await page.select('select[name="AssetGridView_length"]', '50')

	// const selectValue = await page.$eval(
	// 	'select[name="AssetGridView_length"]',
	// 	(select) => select.value
	// )
	// if (selectValue === '1000') {
		// }
	
		await new Promise((resolve) => setTimeout(resolve, 6000))
		await page.click('.select-checkbox')

	await page.click('.btn-updateasset')
	await page.waitForTimeout(3000) // Wait for any additional tasks to complete


const data = [
	{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
	{ AssetName: 'Mohammad', Category: 'The Warrior', Brand: 'Islamic' },
	{ AssetName: 'Chirst', Category: 'Healer', Brand: 'Christian' },
	{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
	{ AssetName: 'Mohammad', Category: 'The Warrior', Brand: 'Islamic' },
	{ AssetName: 'Chirst', Category: 'Healer', Brand: 'Christian' },
	{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
	{ AssetName: 'Mohammad', Category: 'The Warrior', Brand: 'Islamic' },
	{ AssetName: 'Chirst', Category: 'Healer', Brand: 'Christian' },
	{ AssetName: 'Akbarpoor', Category: 'Programmer', Brand: 'Islamic-Christ' },
]

for (let i = 0; i < data.length; i++) {
	const rowSelector = `tbody tr:nth-child(${i + 1})`
	const assetCodeCellSelector = `${rowSelector} td:nth-child(3)`
	const categoryCellSelector = `${rowSelector} td:nth-child(5)`
	const brandCellSelector = `${rowSelector} td:nth-child(6)`

	await page.click(assetCodeCellSelector)
	await page.type(assetCodeCellSelector, data[i].AssetName)

	await page.click(categoryCellSelector)
	await page.type(categoryCellSelector, data[i].Category)

	await page.click(brandCellSelector)
	await page.type(brandCellSelector, data[i].Brand)


	// if ((i + 1) % 16 === 0) {
	// 	await page.evaluate(() => {
	// 		const wtHolderElement = document.querySelector('.wtHolder')
	// 		if (wtHolderElement) {
	// 			wtHolderElement.scrollTop += 1000 // Adjust the scrolling distance as needed
	// 		}
	// 	})
	// }
}



	// // Select the first row
	// const rowSelector = 'tbody tr:first-child'

	// // Select the 6th cell (td) in the row
	// const cellSelector = `${rowSelector} td:nth-child(6)`

	// // Click on the cell
	// await page.click(cellSelector)

	// // Type your desired text into the cell
	// await page.type(cellSelector, 'Your text here')

	
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
