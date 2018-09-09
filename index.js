#!/usr/bin/env node

const Github = require('./utils/github');
const fs = require('fs');
const {safeDump} = require('js-yaml');
const {safeLoad} = require('js-yaml');
const {parse} = require('url');
const download = require('download');

module.exports = (async (access_token,input) => {
	return new Promise(async (reject, resolve) => {
		/* Input Data: All are required or substituted
		{
		  "url": "https://www.myaetherwalet.com/",
		  "description": "Added due to automated detection.",
		  "category": "Phishing",
		  "subcategory": "MyEtherWallet",
		  "addresses": [
		    '0x0000000000000000000000000000000000000000'
		  ],
		  "urlscanuuid": '259507d0-8136-4db3-ad3e-7723eee69217'
		}
		*/
		const username = 'mrluit';
		const repoName = 'etherscamdb';
		const branchName = 'master';
		const filePath = '_data/scams.yaml'

		const entry = {}
		const github = new Github(access_token);
		const fork = await github.fork(username + '/' + repoName);
		const contents = await download('https://raw.githubusercontent.com/MrLuit/EtherScamDB/master/_data/scams.yaml');
		const content = await fork.contents(filePath, access_token);
		const yaml = await safeLoad(contents);
		entry.id = yaml[yaml.length-1].id+1
		entry.name = parse(input.url).hostname.replace('www.','');
		var PRString = 'Added: ' + entry.name + ".<br/>"

		if( input.url ) {
			entry.url = input.url
		}
		if( input.category ) {
			entry.category = input.category
			PRString += 'Category: ' + entry.category + ". "
		} else if( !input.category ) {
			entry.category = 'Scamming'
			PRString += 'Category: ' + entry.category + ".<br/>"
		}
		if( input.subcategory ) {
			entry.subcategory = input.subcategory
			PRString += 'SubCategory: ' + entry.subcategory + ".<br/>"
		} else if( !input.subcategory ) {
			entry.subcategory = 'Trust-Trading'
			PRString += 'SubCategory: ' + entry.subcategory + ".<br/>"
		}
		if( input.description ) {
			entry.description = input.description
			PRString += 'Description: ' + entry.description + ".<br/>"
		} else if( !input.description ) {
			entry.description = 'AutoDetected by ETH Anti-Phishing Workgroup'
			PRString += 'Description: ' + entry.description + ".<br/>"
		}
		if( input.url ) {
			entry.url = input.url
		}
		if( input.addresses ) {
			entry.address = []
			input.addresses.forEach(function(address) {
				entry.address.push(address)
			})
		}
		if( input.urlscanuuid ) {
			urlscan = input.urlscanuuid
			PRString += 'Urlscan Link: https://urlscan.io/result/' + urlscan + ".<br/>"
		}
		var scampresent = false;
		yaml.forEach(function(scam) {
			if(scam.name == entry.name) {
				scampresent = true;
			}
		})
		// scam is not present already
		if( !scampresent ) {
			// TODO: CHECK AGAINST A WHITELIST
			// TODO: CHECK AGAINST EXISTING PRs
			safeDump(yaml.concat(entry),{ lineWidth: 99999999, indent: 4 })
			await content.update("_data/scams.yaml",'Added ' + entry.name + '.',safeDump(yaml.concat(entry),{ lineWidth: 99999999, indent: 4 }));
			console.log('made it here')
			const pr = await github.pr("MrLuit/EtherScamDB",{
				title: "Added " + entry.name,
				body: "Added " + PRString,
				head: fork.getOwner() + ":" + fork.getBranch(),
				base: "master"
			});
			resolve({'statuscode': 1, 'message': PRString})
		}

		// scam is present already
		else if( scampresent ) {
			// TODO: concatenate with existing scam
			resolve({'statuscode': 0, 'message': 'Failed, scam already exists'})
		}
		console.log('didnt make it here')
	});
});
