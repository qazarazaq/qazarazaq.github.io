import { moreWorkProjects, portfolioProjects, supportingProjects, type ProjectScreen } from './portfolio';

export type CaseChapter = { title: string; paragraphs: string[]; screen?: ProjectScreen; crop?: 'search' | 'status' };
export type CaseStudy = {
  slug: string; title: string; headline: string; introduction: string;
  company: 'Bank Mandiri' | 'Telkom Indonesia'; role: string; platform: string;
  context: string; contribution: string; constraint: string;
  screens: ProjectScreen[]; journey?: { title: string; detail: string }[];
  chapters: CaseChapter[]; delivery: string; publicUrl?: string;
};
const [gold, food] = portfolioProjects;
const [kopra, auto, donation] = supportingProjects;

export const caseStudies: CaseStudy[] = [
  {
    slug: gold.slug, title: gold.title, headline: 'From a balance in Livin’ to gold in your hand.',
    introduction: 'A pickup journey across two interfaces: prepare in Livin’, choose a piece at the ATM, and collect the gold.',
    company: 'Bank Mandiri', role: 'UI/CX design', platform: 'Livin’ and ATM',
    context: gold.problem,
    contribution: 'I designed the mobile and ATM interfaces for physical gold pickup: the guide, denomination selection, printing fees, and pickup instructions. The mobile work also covered the ATM directory and its location information.',
    constraint: 'The journey crosses a personal phone and a shared machine. Guidance needs to work before a customer arrives, while the ATM needs to make the immediate selection and collection steps clear.',
    screens: gold.screens, publicUrl: gold.publicUrl,
    journey: [
      { title: 'Prepare in Livin’', detail: 'Enter Ambil Emas, choose the gold account, and find a suitable ATM.' },
      { title: 'Arrive and scan', detail: 'The pickup guide leads into the QR scan at the machine.' },
      { title: 'Choose a piece', detail: 'Compare the available brands and denominations, with printing fees shown separately.' },
      { title: 'Review and confirm', detail: 'Keep the selected gold and total fee visible before continuing.' },
      { title: 'Collect the gold', detail: 'The final screen points back to the physical machine and asks the customer to collect their piece.' },
    ],
    chapters: [
      { title: 'Grams and rupiah answer different questions.', screen: gold.screens[1], paragraphs: [
        'A denomination tells a customer how much gold they are choosing. The printing fee tells them what it costs to produce that piece. Placing both under a generic price would make the comparison harder to read.',
        'I kept weight and printing fee as separate information. The selection is one piece from one brand, with the chosen piece and total fee held in a shared summary as customers compare the options.',
        'This balances comparison with confirmation: the product choices remain visible, and the current selection does not disappear when attention moves elsewhere on the screen.',
      ] },
      { title: 'Give the handoff one clear action.', screen: gold.screens[0], paragraphs: [
        'The mobile guide has two useful destinations: start a pickup, or find an ATM. They serve different moments in the journey, so they should not compete equally.',
        '“Scan QR di ATM” is the primary action. The ATM directory remains one step away as a secondary link. The guide pairs that action with an image of the machine and direct pickup instructions.',
        'For the directory, locations are grouped by city. A repeated name, address, and map action gives customers a consistent way to scan their area as the list grows.',
      ] },
      { title: 'Carry pickup through to collection.', screen: gold.screens[2], paragraphs: [
        'Confirmation is only part of the task. The customer still needs to collect the physical gold before leaving the ATM.',
        'The final instruction makes that last action explicit and uses the machine itself as the visual reference. The interface carries the pickup through to collecting the physical gold.',
      ] },
    ],
    delivery: 'The live customer journey connects the Livin’ pickup guide with denomination and fee selection at the ATM, followed by instructions to collect the physical gold.',
  },
  {
    slug: food.slug, title: food.title, headline: 'An order starts before the menu.',
    introduction: 'Restaurant discovery, dining modes, menu selection, and saved carts inside Livin’.',
    company: 'Bank Mandiri', role: 'UI/CX design', platform: 'Mobile',
    context: food.problem,
    contribution: 'My work covered discovery, categories, menu selection, and cart states, connecting dine-in and delivery orders with the existing payment journey.',
    constraint: 'Food ordering sits inside a banking app. It needs room for food imagery and browsing, while location, availability, and the next payment step remain easy to understand.',
    screens: food.screens, publicUrl: food.publicUrl,
    journey: [
      { title: 'Set the dining context', detail: 'Choose delivery, pick-up, or dine-in in the discovery area.' },
      { title: 'Find a restaurant', detail: 'Browse categories or use the nearby shortcut in the selected location.' },
      { title: 'Choose the order', detail: 'Move from the restaurant into its menu, with item names and prices visible.' },
      { title: 'Return to a saved cart', detail: 'Check whether the restaurant is still available before continuing.' },
      { title: 'Continue to payment', detail: 'Carry the order into the existing Livin’ payment journey.' },
    ],
    chapters: [
      { title: 'Keep the dining mode in context.', screen: food.screens[0], paragraphs: [
        'Delivery, pick-up, and dine-in start in the same discovery area, but they set different expectations for the order. The service choice belongs early, before a customer commits to a restaurant or menu.',
        'I kept the selected mode visible as customers moved into the restaurant. Location and dining mode stay part of the same context rather than becoming details that need to be remembered from a previous screen.',
      ] },
      { title: 'Make a larger category set feel familiar.', screen: food.screens[1], paragraphs: [
        'A longer category list needs more than extra icons. Customers should still recognize each choice as the discovery area changes with scrolling.',
        'The category artwork and labels remain consistent across the scroll states. “Terdekat” stays as a nearby shortcut alongside the broader food categories.',
        'The same discipline carries into the restaurant: food imagery gives items their character, while names, prices, and the dining context provide a stable structure for choosing.',
      ] },
      { title: 'A saved cart is a changing state.', screen: food.screens[2], paragraphs: [
        'An order can be saved while a restaurant is open, then revisited after it closes or falls outside the delivery area. The cart should reflect the current situation.',
        'I worked through available, closing-soon, closed, and out-of-range states. Available carts remain active; other states explain the restaurant’s availability beside the saved order.',
        'Keeping that explanation at the point of choice helps the customer decide which order to continue before entering payment.',
      ] },
    ],
    delivery: 'The live experience brings restaurant discovery, menu selection, and saved-cart availability into the same ordering journey inside Livin’.',
  },
  {
    slug: 'kopra-scm', title: kopra.title, headline: 'A dense workspace with a readable order.',
    introduction: 'Invoice overview, search, and status flows for customer-facing supply-chain banking.',
    company: 'Bank Mandiri', role: 'UI/CX design', platform: 'Desktop',
    context: 'An invoice workspace brings together identifiers, buyers, amounts, dates, and several stages of approval. Customers need to locate a record and understand where it stands without losing the rest of the list.',
    contribution: 'I worked on the invoice overview, search, and status flows in Kopra SCM, with a focus on information hierarchy and consistent interaction patterns.',
    constraint: 'The interface needs to retain the detail required for financial work. The challenge is to organize that density while retaining the useful columns.',
    screens: [kopra.screen],
    journey: [
      { title: 'Start with a known detail', detail: 'Search using an invoice number or buyer name.' },
      { title: 'Narrow the list', detail: 'Use status filters in the same workspace.' },
      { title: 'Compare the records', detail: 'Read status, invoice, buyer, amount, and dates together.' },
      { title: 'Understand the stage', detail: 'Distinguish pending approval, pending bank approval, and rejected records.' },
    ],
    chapters: [
      { title: 'Let people start with what they know.', screen: kopra.screen, crop: 'search', paragraphs: [
        'An invoice number is not always the detail a customer remembers. Sometimes the buyer name is the more useful starting point.',
        'The search accepts either. Status filters sit directly below it, so customers can narrow the result in place instead of moving to a separate search screen.',
        'This keeps retrieval close to the invoice list and leaves the surrounding records available for comparison.',
      ] },
      { title: '“Pending” is not one condition.', screen: kopra.screen, crop: 'status', paragraphs: [
        'Pending approval and pending bank approval describe different stages. Giving both a generic pending label would remove information that matters to the person reading the invoice.',
        'I kept these stages distinct, alongside explicit rejected and other invoice states. The text carries the meaning; color helps people scan the list.',
        'Status is placed in the first column, so the state of a record is visible before reading its supporting details.',
      ] },
      { title: 'Keep the row useful.', paragraphs: [
        'Invoice number, buyer, amount, and dates remain together in a consistent column order. The list keeps each record and its status connected.',
        'The result is a workspace that retains the information needed for wholesale banking while giving search, filters, and row hierarchy distinct jobs.',
      ] },
    ],
    delivery: 'The invoice workspace keeps search, status filters, and invoice details together, with distinct labels for the stages shown in the list.',
  },
];

const focusedDetails: Record<string, { slug: string; headline: string; context: string; contribution: string; chapters: CaseChapter[]; delivery: string }> = {
  'Livin Auto': { slug: 'livin-auto', headline: 'From finding a vehicle to considering the finance.',
    context: 'Choosing a vehicle involves more than its appearance. Variant, availability, price, and the step into credit simulation need to support the same decision.',
    contribution: auto.description,
    chapters: [
      { title: 'Vehicle information comes first.', paragraphs: ['The vehicle detail groups imagery with the variant, color, availability, and listed price. The financing action remains close to this product information.'] },
      { title: 'Connect browsing to simulation.', paragraphs: ['The continuation into credit simulation gives the customer a next step from the vehicle they are considering. Reusable interface states support the wider financing application.'] },
    ], delivery: 'Vehicle discovery connects with credit simulation and the continuation into a financing application.' },
  'Sukha Donasi': { slug: 'sukha-donasi', headline: 'A donation amount with its campaign still in view.',
    context: 'A customer needs to understand the campaign, choose a donation amount, and continue to payment without losing the purpose of the contribution.',
    contribution: donation.description,
    chapters: [
      { title: 'Support a quick choice and a personal amount.', paragraphs: ['Preset donation amounts and a custom amount field share one step. Customers can use a common value or choose their own without changing the structure of the journey.'] },
      { title: 'Keep the campaign connected to payment.', paragraphs: ['Campaign information stays above the amount choices. The total donation and payment action form the continuation at the bottom of the screen.'] },
    ], delivery: 'The donation journey connects campaign context, amount selection, review, and payment.' },
  'Misi': { slug: 'misi', headline: 'Make completion and the reward readable together.',
    context: 'A mission has an activity, a completion state, and a reward. These need to be understandable in the same place.',
    contribution: 'My work covered mission progress, reward levels, and the completion and reward-claiming flow in Livin’.',
    chapters: [
      { title: 'Show what has been completed.', paragraphs: ['The mission detail keeps the activity and level visible, with a separate confirmation of completion. The instructions remain available below the reward information.'] },
      { title: 'Keep the reward explicit.', paragraphs: ['The points, multiplier, total, and badge are presented as distinct information. The claim action stays at the bottom of the screen.'] },
    ], delivery: 'The shipped Misi flow connects mission progress and completion with a clear reward-claim action.' },
  'Virtual Account': { slug: 'virtual-account', headline: 'Find the payment provider without a dead end.',
    context: 'A virtual-account search needs to identify a provider and offer a useful next step if the result does not match the customer’s intent.',
    contribution: 'My work covered virtual-account lookup and provider selection within the payment journey.',
    chapters: [
      { title: 'Keep the match close to the search.', paragraphs: ['The provider result appears below the entered account, with the provider’s identity visible while the keyboard remains open.'] },
      { title: 'Offer a way to correct the result.', paragraphs: ['“Pilih Penyedia Jasa” provides a direct route to provider selection when the search result is not the right match. The customer can continue the task from the same context.'] },
    ], delivery: 'The live lookup flow supports both a provider match and a continuation into provider selection.' },
  'Passport onboarding': { slug: 'passport-onboarding', headline: 'Prepare the documents before the capture step.',
    context: 'Passport-based onboarding needs to explain the required documents before asking the customer to submit them, including supporting information for Indonesians living abroad.',
    contribution: 'My work covered document preparation and capture guidance in the passport onboarding journey.',
    chapters: [
      { title: 'Set the document expectation early.', paragraphs: ['The preparation screen names the passport and supporting documents together. An illustration reinforces the document combination before the customer continues.'] },
      { title: 'Make the overseas context specific.', paragraphs: ['The guidance calls out the supporting KMILN document for Indonesian citizens living abroad, rather than leaving that requirement until a later upload step.'] },
    ], delivery: 'The shipped onboarding journey provides document-preparation guidance before continuing into the application.' },
  'Sukha — Maroon 5': { slug: 'sukha-maroon-5', headline: 'Concert discovery with a direct path to booking.',
    context: 'The Sukha entry needs to establish which event is on offer and make the move into ticket booking easy to find.',
    contribution: 'My work covered the concert-ticketing entry in Sukha and its continuation into booking.',
    chapters: [
      { title: 'Let the event do the introducing.', paragraphs: ['The event artwork carries the artist, date, and venue. The surrounding Sukha interface gives it room without separating the event from the purchase action.'] },
      { title: 'Keep the booking action prominent.', paragraphs: ['A distinct action area follows the event artwork. “Beli Sekarang!” gives the customer a direct continuation from discovery into booking.'] },
    ], delivery: 'The shipped Sukha entry connected the Maroon 5 concert promotion with ticket access and booking.' },
  'GEALILEO': { slug: 'gealileo', headline: 'Procurement stages, kept close to the records.',
    context: 'Telkom’s Mitra workspace presents procurement records across several stages. Partners need to locate an item and read its current status within the same list.',
    contribution: 'I worked on the Mitra procurement workspace during my time at Telkom Indonesia, including the record list, search, and stage-based organization.',
    chapters: [
      { title: 'Use the procurement stages as a way into the list.', paragraphs: ['Stage tabs run above the records, covering the progression from explanation meetings and proposal review through negotiation, completion, and cancellation.'] },
      { title: 'Read the record and status together.', paragraphs: ['The table keeps procurement title, date, identifier, responsible person, and status in a repeated row structure. Title search provides a direct starting point when the partner knows the record they need.'] },
    ], delivery: 'The shipped Mitra workspace brings procurement search, stage filters, and record status into a single desktop view.' },
};

for (const project of moreWorkProjects) {
  const detail = focusedDetails[project.title];
  caseStudies.push({ ...detail, title: project.title, introduction: project.description,
    company: project.title === 'GEALILEO' ? 'Telkom Indonesia' : 'Bank Mandiri',
    role: project.title === 'GEALILEO' ? 'UI design' : 'UI/CX design',
    platform: project.screen.width > project.screen.height ? 'Desktop' : 'Mobile',
    constraint: '', screens: [project.screen],
  });
}
export const findCaseStudy = (slug: string | null) => caseStudies.find(project => project.slug === slug);
export const projectSlug = (title: string) => caseStudies.find(project => project.title === title)?.slug ?? '';
