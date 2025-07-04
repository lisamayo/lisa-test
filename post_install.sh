#!/bin/bash

# In Jenkins, reconfigure node and update gitignore.
if [[ -v JENKINS_HOME ]]; then
  # Remove npm config used for local development.
  rm .npmrc

  # Update npm config.
  npm config set registry https://artifactory.express-scripts.com/artifactory/api/npm/npm-virtual/
  npm config set strict-ssl false
  npm config set cafile .ddev/web-build/cafile.pem

  # Remove dist directories from gitignore.
  sed -i "/\/.*\/custom\/.*\/js\/dist\//d" .gitignore
  sed -i "/\/.*\/custom\/.*\/styles\/dist\//d" .gitignore
  sed -i "/\/docroot\/storybook/d" .gitignore
fi

echo "Running yarn install..."
if ! yarn install; then
  echo "Yarn install failed."
  exit 1
fi

echo "Compiling CSS/JS assets..."
if ! yarn compile; then
  echo "Compiling assets failed."
  exit 1
fi

# Only do the following for Jenkins builds.
if [[ -v JENKINS_HOME ]]; then
  echo "Building storybook..."
  if ! yarn build-storybook --output-dir docroot/storybook; then
    echo "Storybook build failed."
    exit 1
  fi

  # Remove local development directories.
  rm -rf .ddev lando .storybook .vscode .yarn node_modules || true
  rm .browserslistrc .eslintignore .eslintrc .prettierignore .lando.yml .npmrc .nvmrc .prettierrc.json .stylelintignore .stylelintrc.json babel.config.json package.json phpunit.xml phpunit.xml.dist postcss.config.js pull_request_template.md tsconfig.json yarn.lock || true
fi
