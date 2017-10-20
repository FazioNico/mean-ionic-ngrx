# @Author: Nicolas Fazio <webmaster-fazio>
# @Date:   20-10-2017
# @Email:  contact@nicolasfazio.ch
# @Last modified by:   webmaster-fazio
# @Last modified time: 20-10-2017
# @Author: Nicolas Fazio <webmaster-fazio>
# @Date:   20-10-2017
# @Email:  contact@nicolasfazio.ch
# @Last modified by:   webmaster-fazio
# @Last modified time: 20-10-2017

# release script v.0.0.1

function checkVersion {
	output=$(npm version ${release} --no-git-tag-version)
	version=${output:1}
}
function bumpPackage {
	search='("version":[[:space:]]*").+(")'
	replace="\1${version}\2"
	sed -i ".tmp" -E "s/${search}/${replace}/g" "$1"
	rm "$1.tmp"
}
function bumpXML {
	search='(version=[[:space:]]*").+(")'
	replace="\1${version}\2"
	sed -i ".tmp" -E "s/${search}/${replace}/g" "$1"
	rm "$1.tmp"
}

function bumpMD {
	search='(version-*).+(-blue.svg)'
	replace="\1${version}\2"
	sed -i ".tmp" -E "s/${search}/${replace}/g" "$1"
		rm "$1.tmp"
}
function help {
	echo "Usage: $(basename $0) [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]"
}

if [ -z "$1" ] || [ "$1" = "help" ]; then
	help
	exit
fi

release=$1
# establish branch and tag name variables
devBranch=dev
masterBranch=master

if [ -d ".git" ]; then
	changes=$(git status --porcelain)

	if [ -z "${changes}" ]; then
		checkVersion
		releaseBranch=release/$version
		# checkout release branch
		git checkout -b $releaseBranch
		#  bump files version
		bumpXML "config.xml"
		git add .
		bumpPackage "package.json"
		git add .
		bumpMD "README.md"
		# create tags version
		git add .
		git commit -m "Bump to ${version}"
		git tag -a "${output}" -m "Release ${version}"
		# merge release branch with the new version number into master
		git checkout $masterBranch
		git merge --no-ff $releaseBranch -m"Merge release $version"
		# merge release branch with the new version number back into develop
		git checkout $devBranch
		git merge --no-ff $releaseBranch -m"Merge release $version"
		# remove release branch
		git branch -d $releaseBranch
    # if have a remote origin 
		if [ -d ".git/refs/remotes" ]; then
			git push origin --tags
			# npm publish ./
		else
			echo 'Create remote origin to push release tags'
		fi

	else
		echo "Please commit staged files prior to bumping"
	fi
else
	#  bump files version
	bumpXML "config.xml"
	bumpPackage "package.json"
fi
