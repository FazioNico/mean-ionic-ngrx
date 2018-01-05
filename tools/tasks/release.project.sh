# @Author: Nicolas Fazio <webmaster-fazio>
# @Date:   31-12-2017
# @Email:  contact@nicolasfazio.ch
# @Last modified by:   webmaster-fazio
# @Last modified time: 05-01-2018

# release script v.0.0.5

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

function changelog(){
dateCommit=$(git log -1 --date=short --pretty=format:%cd)
firstTag=$(git tag | sort -r | head -1)
secondTag=$(git tag | sort -r | head -2 | awk '{split($0, tags, "\n")} END {print tags[1]}');
fileContent=$(<CHANGELOG.md);

echo '

## '$output' ('$dateCommit')' > CHANGELOG.md;
git log `git describe --tags --abbrev=0 HEAD^`..HEAD --pretty=format:'- [%h](https://github.com/FazioNico/mean-ionic-ngrx/commit/%H) %s' ${secondTag}..${firstTag}  --reverse --no-merges | grep ": " >> CHANGELOG.md
echo '
'  >> CHANGELOG.md;

echo "$fileContent" >> CHANGELOG.md;
}

if [ -z "$1" ] || [ "$1" = "help" ]; then
	help
	exit
fi

# Check if current branch is "master" or "dev".
CURRENTBRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENTBRANCH" = "master" ] || [ "$CURRENTBRANCH" = "dev" ]; then
	echo '######################################';
	echo '[ERROR] Aborting script: You need to create a new freture branch for your changes.';
  exit 1;
fi

# run release script:
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
		bumpXML "config.xml";
		bumpPackage "package.json";
		bumpMD "README.md";
		changelog;
		# create tags version
		git add .
		git commit -m "Bump to ${version}";
		git tag -a "${output}" -m "Release ${version}";
		# merge release branch with the new version number into master
		git checkout $masterBranch;
		git merge --no-ff $releaseBranch -m"Merge release $version";
		# merge release branch with the new version number back into develop
		git checkout $devBranch;
		git merge --no-ff $releaseBranch -m"Merge release $version";
		# remove release branch
		git branch -d $releaseBranch;
		# replace to masterBranch
		git checkout $masterBranch;
    # if have a remote origin
		if [ -d ".git/refs/remotes" ]; then
			git push origin --tags
			git push origin master
			# delete current working branch
			git branch -d $CURRENTBRANCH
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
