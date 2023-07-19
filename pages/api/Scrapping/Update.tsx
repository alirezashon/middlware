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
=======
	await page.type('#UserName', '')
	await page.type('#Password', '')
>>>>>>> 6e32b5bbadfab291013f647385f310241871822e
	await page.click('[type="submit"]')

	await page.waitForNavigation({ waitUntil: 'networkidle0' })
	await page.goto(`${process.env.ASSET_TARGET}`)

	await page.waitForSelector('.AddPlus')
	await page.click('.AddPlus')

	await page.waitForSelector('.FormAssetCustomFilterViewCustomSearch') // Wait for the button action to complete, adjust the timeout value as needed
	await page.type(
		'.FormAssetCustomFilterViewCustomSearch',
		'AST2023336033,AST2022204888,AST2022306419,AST2022306532,AST2022306533,AST2022306547,AST2023333530,AST2023341263,AST2023344271,AST2023340596'
	)
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')

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
	}

	//  await browser.close()
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
