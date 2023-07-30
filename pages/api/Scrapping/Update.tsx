import { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())
interface AssetData {
	AssetCode: string
	AssetName: string
	Category: string
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
	await page.type(
		'.FormAssetCustomFilterViewCustomSearch',
		assetCodes
	)
	await page.click('.FormAssetCustomFilterViewCustomSearch')

	await page.waitForSelector('.AssetTrackerFileColumn')

	await new Promise((resolve) => setTimeout(resolve, 8000))
	await page.waitForSelector('.select-checkbox')
	await page.click('.select-checkbox')

	await page.waitForTimeout(3000)

	// await page.click('.btn-updateasset')
	await page.waitForSelector('.buttonwidth .btn.btn-updateasset.bgm-teal')

	// Get all the buttons with the specified class and loop through them
	const buttons = await page.$$('.buttonwidth .btn.btn-updateasset.bgm-teal')
	for (const button of buttons) {
		// Get the text content of the button using optional chaining to handle null
		const buttonText = await button.evaluate((node) => node.textContent?.trim())

		// Check if the button has the desired text content, you can modify this condition as needed
		if (buttonText === 'Update') {
			// Click the button
			await button.click()
			break // Assuming you only want to click the first button that matches the condition
		}
	}
	await page.waitForTimeout(2000)

	await page.waitForSelector('a[onclick="TabAssetPageLoad(true,1)"]')
	await page.click('a[onclick="TabAssetPageLoad(true,1)"]')

	await page.waitForSelector('#FormImportAssetFormView_Text_Column')
	await page.click('#FormImportAssetFormView_Text_Column')
	await page.click('#FormImportAssetFormView_AllowAllColumn')

	await page.waitForSelector('.jstree-anchor', { timeout: 60000 })

	// Get all the anchor elements with the specified class
	const anchorElements = await page.$$('.jstree-anchor')

	// Array to store matching anchor elements
	const matchingAnchorElements = []

	// Loop through the anchor elements to find the ones with the desired text content
	for (const anchorElement of anchorElements) {
		// Get the text content of the anchor element using optional chaining to handle null
		const anchorText = await anchorElement.evaluate((node) =>
			node.textContent?.trim()
		)

		// Check if the anchor element has the desired text content, you can modify this condition as needed
		if (
			anchorText === 'Asset Name' ||
			anchorText === 'Agent Name' ||
			anchorText === 'Category'
		) {
			matchingAnchorElements.push(anchorElement)
		}
	}

	// Click on all matching anchor elements
	for (const anchorElement of matchingAnchorElements) {
		try {
			// Click each anchor element using page.click()
			await anchorElement.click()
			// Wait for some time before clicking the next element (optional)
			await page.waitForTimeout(1000)
		} catch (clickError) {
			// Handle any click error here if needed
			console.error('Error performing click:', clickError)
		}
	}

	await page.waitForTimeout(3000)
	await page.waitForSelector('#handsonTable')

	// Change the height style of the element to 4444px
	await page.evaluate(() => {
		const element = document.getElementById('handsonTable')
		if (element) {
			element.style.height = '4444px'
		}
	})
	await page.waitForTimeout(2000)

	for (let i = 0; i < data.length; i++) {
		const rowSelector = `tbody tr:nth-child(${i + 1})`
		const assetNameCellSelector = `${rowSelector} td:nth-child(3)`
		const categoryCellSelector = `${rowSelector} td:nth-child(5)`
		const agentCellSelector = `${rowSelector} td:nth-child(50)`

		await page.click(assetNameCellSelector)
		await page.type(assetNameCellSelector, data[i].AssetName)

		await page.click(categoryCellSelector)
		await page.type(categoryCellSelector, data[i].Category)

		await page.click(agentCellSelector)
		await page.type(agentCellSelector, data[i].Agent)
	}

	//  await browser.close()
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		const data = [
	
		]
		const spanTexts = await main(data)
		res.status(200).json({ message: 'Action performed successfully' })
	} catch (error) {
		console.error('Error performing action:', error)
		res.status(500).json({ error: 'Error performing action' })
	}
}

export default handler




