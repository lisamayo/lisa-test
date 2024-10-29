Created by Pachabhaiya, Chhabi, last modified by Rier, Eric on Aug 14, 2024
Evernorth Single Directory Components (SDC) is a Drupal custom module for creating the presentational UI components that can be consumed by Drupal web applications. Single Directory Component was introduced as an experimental module in Drupal 10.1.0 and is stable in Drupal 10.3.0.



GitHub Repository URL for Evernorth SDC: https://git.express-scripts.com/ExpressScripts/evernorth-sdc
Official documentation for single directory component: https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components

Figma: https://www.figma.com/design/spcJO0IZPIjI1Re1QiDhyF/Marketing-Team-Module---Working-File

Leaf Design Tokens: https://git.express-scripts.com/ExpressScripts/leaf-design-tokens

Getting Started
Install core SDC module

$ ddev drush pm:install sdc
Once we have the module installed, we can create the components in the custom theme or module folder. We have a custom module (evernorth_sdc) for building the components.

Component Directory Structure
docroot/modules/shared/evernorth_sdc
web/modules/shared/evernorth_sdc
├─ components
│   ├─ bullet
│   │   ├─ styles
│   │   │   ├─ dist
│   │   │   │   ├─ bullet.css
│   │   │   │   └─ bullet.min.css
│   │   │   └─ src
│   │   │       └─ bullet.scss
│   │   ├─ bullet.component.yml
│   │   ├─ bullet.stories.json
│   │   ├─ bullet.stories.twig
│   │   └─ bullet.twig
│   ├─ bullet-item
│   │   ├─ js
│   │   │   ├─ dist
│   │   │   │   ├─ bullet-item.dev.js
│   │   │   │   └─ bullet-item.js
│   │   │   └─ src
│   │   │       └─ bullet-item.js
│   │   ├─ styles
│   │   │   ├─ dist
│   │   │   │   ├─ bullet-item.css
│   │   │   │   └─ bullet-item.min.css
│   │   │   └─ src
│   │   │       └─bullet-item.scss
│   │   ├─ bullet-item.component.yml
│   │   └─ bullet-item.twig
│   ├─ ...
│   ...
├─ styles
│   └─ src
│       └─ utilities
│           ├─ _common.scss
│           ├─ _import.scss
│           ├─ _mixins.scss
│           └─ _variables.scss
├─ evernorth_sdc.breakpoints.yml
└─ evernorth_sdc.info.yml




Leaf Design Tokens
We make use leaf design tokens in our SCSS file for SDC components. Leaf design tokens are basically a list of SASS variables and mixins available for us to use in our site.

Install/update leaf design token package:
$ ddev yarn add @esi/leaf-design-tokens@dev


package.json
/package.json
{
  "name": "evernorth-drupal",
  "dependencies": {
    "@esi/leaf-design-tokens": "^1.6.0-beta.21",
    "breakpoint-sass": "^2.7.1",
    "esi-build-drupal": "git+ssh://git@git.express-scripts.com/ExpressScripts/esi-build-drupal#2.0.7",
    ...
  },
  ...
}
Leaf design tokens package directory structure

Import leaf design tokens in the Evenorth SDC SCSS files
web/modules/shared/evernorth_sdc/styles/src/utilities/_import.scss





Compiling SCSS files
Compile changes within JS or SCSS files

$ ddev es compile all web/modules/shared/evernorth_sdc


Watch for changes within JS or SCSS files

$ ddev es watch all web/modules/shared/evernorth_sdc 


Settings to determine if SDC should be used to render the Evernorth rebrand components
Currently, we're in the early development phase for the Evernorth rebrand components. We can't roll it out to production yet. So, we have some settings added to determine if SDC should be used for rendering the rebrand component. The settings are available in two different places. One in the global site settings and another in the paragraph component.

Site Global Settings
https://evernorth.ddev.site/admin/config/system/global-site


Paragraph




Use SDC settings in Node level? TBD ← Apply SDC to all the paragraph components added in a node.

Paragraph Preprocess function
Preprocess function to set the use_sdc variable with a boolean value available to all paragraph types. If use_sdc is set to true, use SDC for rendering the component. Else, use traditional approach.

// web/themes/custom/base.theme
function base_preprocess_paragraph(&$variables) {
  $paragraph = $variables['paragraph'];
 
  // Determine if Single Directory Component should be used for rendering the component.
  $conf = \Drupal::config('es_modules.global_site_settings');
  $use_sdc = (bool) $conf->get('use_sdc');
  if (!$use_sdc) {
    if ($paragraph->hasField('field_use_sdc') && !$paragraph->get('field_use_sdc')->isEmpty()) {
      $use_sdc = (bool) $paragraph->get('field_use_sdc')->getValue()[0]['value'];
    } else {
      $parent = $paragraph->getParentEntity();
      if (!empty($parent) && $parent->getEntityTypeId() == 'paragraph') {
        if ($parent->hasField('field_use_sdc') && !$parent->get('field_use_sdc')->isEmpty()) {
          $use_sdc = (bool) $parent->get('field_use_sdc')->getValue()[0]['value'];
        } else {
          $parent = $parent->getParentEntity();
          if (!empty($parent) && $parent->getEntityTypeId() == 'paragraph') {
            if ($parent->hasField('field_use_sdc') && !$parent->get('field_use_sdc')->isEmpty()) {
              $use_sdc = (bool) $parent->get('field_use_sdc')->getValue()[0]['value'];
            }
          }
        }
      }
    }
  }
  $variables['use_sdc'] = $use_sdc;
}


Creating and Using Single Directory Component
Use drush ...

If desired, you can create the below files using drush with the command:



ddev ssh
drush generate single-directory-component --destination=web/modules/shared/evernorth_sdc
Note: If you generate your component with drush, you will need to move your css into styles/src and js into js folders.

Bullet component
bullet.component.ymlbullet.twigparagraph--bullet-container.html.twigParagraph
Metadata that describes the component. 
evernorth_sdc/components/bullet/bullet.component.yml
name: Bullet
props:
  type: object
  required:
    - style
  properties:
    style:
      type: string
      title: Bullet style
      enum: ['default', 'stats']
    title:
      type: string
      title: Title
    columns:
      type: string
      title: Columns
      enum: ['1', '2', '3', '4']
slots:
  bullet_items:
    title: Bullet items
libraryOverrides:
  css:
    component:
      styles/dist/bullet.min.css: {}
Bullet item component
bullet-item.component.ymlbullet-item.twigbullet-item.scssparagraph--bullet.html.twigParagraphCTA
Metadata that describes the component. 
evernorth_sdc/components/bullet-item/bullet-item.component.yml
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
name: Bullet item
props:
  type: object
  properties:
    title:
      type: string
      title: Title
    description:
      type: string
      title: Description
    stat:
      type: string
      title: Stat
slots:
  cta:
    title: CTA Button/Link
  icon:
    title: Icon
libraryOverrides:
  css:
    component:
      styles/dist/bullet-item.min.css: {}

Frontend - Bullets component




Storybook
Drupal module: https://www.drupal.org/project/storybook


Note: Node.js version must be >= 18 for storybook server.



Start storybook server

$ ddev yarn install
$ ddev yarn storybook

Storybook Page URL

 https://evernorth.ddev.site:6006

Note: Do not use the storybook localhost or network IP URL suggested in the terminal after starting the storybook.





Finds all the Twig stories, and generates the JSON files.

$ drush storybook:generate-all-stories

Watch for changes in twig stories and generate the JSON files

$ brew install watch
$ watch --color ddev drush storybook:generate-all-stories


CSS Naming Convention = ???
Currently, we're trying to follow BEM methodology as much as possible.

Use "evernorth-sdc-" as a prefix for every components class. For e.g., if the name of the component is "bullet-item", the main class for the component will be "evernorth-sdc-bullet-item" and this is the "block" in the "block__element--modifier"

The component element will follow the block name separated by two underscore (e.g., block__element).
The modifiers comes after the element separated by two dashes (e.g., block__element--modifier) .

Let's take an example of bullet-item twig file.

bullet-item.twig
{%
  set classes = [
  'evernorth-sdc-bullet-item',
]
%}
<div class="{{ classes|join(" ") }}">
  <div class="evernorth-sdc-bullet-item__content">
    <div class="evernorth-sdc-bullet-item__header">
      {% block icon %}{% endblock %}
 
      {% if stat is not empty %}
        <h2 class="evernorth-sdc-bullet-item__stat">{{ stat }}</h2>
      {% endif %}
 
      <h3 class="evernorth-sdc-bullet-item__title">{{ title }}</h3>
    </div>
 
    {% if description is not empty %}
      <div class="evernorth-sdc-bullet-item__description">{{ description|raw }}</div>
    {% endif %}
 
    {% block cta %}{% endblock %}
  </div>
</div>

The class name for all the elements has the same block name, two underscores and the element name. E.g.,

evernorth-sdc-bullet-item__content

evernorth-sdc-bullet-item__header instead of evernorth-sdc-bullet-item__content__header

evernorth-sdc-bullet-item__title instead of evernorth-sdc-bullet-item__content__header__title

evernorth-sdc-bullet-item__description instead of evernorth-sdc-bullet-item__content__description


Some example of modifiers used in bullet.twig file:

evernorth-sdc-bullet--style-stats

evernorth-sdc-bullet--style-stacked

evernorth-sdc-bullet--columns-3

Git Branching
Use this Git branch (feature/evernorth-rebrand) as a base branch for working on any Evernorth Rebrand stories.
https://git.express-scripts.com/ExpressScripts/evernorth-drupal/tree/feature/evernorth-rebrand


Create a new feature branch

$ git checkout feature/evernorth-rebrand

$ git pull

$ git checkout -b HMDTHU-12345-my-new-component

When submitting a PR, please use feature/evernorth-rebrand as the base branch.
