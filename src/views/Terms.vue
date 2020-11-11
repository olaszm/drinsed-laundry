<template>
  <div class="terms">
    <div class="terms__inner wrapper">
      <h1>Customer Terms and Conditions</h1>
      <div class="section">
        <ol v-for="(item, i) in terms" :key="i">
          <div class="title">{{ i + 1 }}. {{ item.name }}</div>

          <ol class="bullets" v-for="(bullet, ind) in item.bullets" :key="ind">
            <li>
              <span>{{ ind + 1 }}.</span>
              <p>{{ bullet }}</p>
            </li>
          </ol>
        </ol>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      terms: [
        {
          name: "Our contract",
          bullets: [
            "These terms will apply to any order we accept from you. You will not be able to place an order unless you accept these Terms.",
            "These terms may change from time to time, and the current version will apply each time you place an order. We will notify you of changes to the Terms by email.",
            "It is important you have read these Terms carefully and understand them before placing an Order. The Terms restrict Our liability to you in certain circumstances, set out in paragraph 12.",
            "Any Orders without a voucher code and which have a value of less than £20 will be charged at £20 as a minimum. This minimum order value may differ depending on location – if you need help with this, contact Customer Care at support@drinsed.com.",
          ],
        },
        {
          name: "Definitions",
          bullets: [
            "When the following words are used in these Terms, this is what they mean",
            "When we use the words “writing” or “written” in these Terms, this will include e-mail and App notifications.",
          ],
        },
        {
          name: "Placing an Order",
          bullets: [
            "You must check the details of your Order carefully before submitting it, as We will not be liable for any errors you make. If you think you may have made a mistake, please contact Us at support@drinsed.com. We will confirm any changes to your Order by email.",
            "Submission of an Order does not create a contract between us; this only arises when We send you an email confirming acceptance of your Order.",
            "We will assign an order number and inform you of it when We accept the Order. If you need to contact Us, please quote the order number.",
            "If for any reason We are unable fulfil your Order, we will let you know by email.",
          ],
        },
        {
          name: "Changes to your Order",
          bullets: [
            "You may make a change to an Order up to two hours before the agreed collection time by contacting Us at support@drinsed.com.",
            "With your consent and at our discretion, we may make a change to your Order as an alternative to cancelling it.",
            "If changes are agreed, We will re-issue the Order confirmation to you via email.",
          ],
        },
        {
          name: "Cancelling or rescheduling your Order",
          bullets: [
            "You have the following limited rights to cancel an Order.",
            "You may cancel or reschedule your Order with no additional charge: at any time up to four hours before the agreed collection time by contacting support@drinsed.com; or if, after we have collected your Item(s), we are affected by an Event Outside Our Control by contacting support@drinsed.com.",
            "You agree that once an Item has been collected from you, we have begun providing the agreed Services and that any rights of cancellation you may have under law will be lost.",
            "If you cancel or reschedule your order less than four hours before collection, or you are not present for collection, you will incur a £10 additional charge.",
            "If you reschedule your delivery less than four hours before, or you are not present for delivery, you will also incur a £10 additional charge.",
          ],
        },
        {
          name: "Collection and redelivery",
          bullets: [
            "We will use reasonable efforts to collect and re-deliver Items at the times agreed but we cannot guarantee this. We will use reasonable efforts to communicate any delay to you by phone or email.",
            "If you are not available to accept redelivery of Items, we will contact you by phone or email to rearrange at your convenience.",
            "If you are unavailable at the designated time and delivery is not possible, a redelivery charge of £10 will be charged for each attempted delivery. We will endeavour to find a suitable redelivery time, however if you would rather organise a same day courier, this is your responsibility.",
            "If you have failed to accept or arrange redelivery of an Item for more than 90 days after the agreed date, we may dispose of the Item or donate it to a charity of Our choice.",
            "You may arrange to have Items collected from or re-delivered to a third party, but this is at your own risk and an acknowledgement must be signed by them on your behalf.",
            "You may request Us to leave an Item in an agreed location without providing Us with a signature of acknowledgement, so long as this instruction is in writing. This is at Our discretion and entirely at your own risk, and we shall not be liable to you for any damage or loss of these Items.",
          ],
        },
        {
          name: "Service standards",
          bullets: [
            "In accordance with good industry standards, we will provide the Services with reasonable care and skill.",
            "We will not be liable for any delay or non-performance of our Services if you have failed to provide accurate information in your Order or if you fail to accept redelivery of Items as agreed.",
            "We will not be liable for any item provided without a care label, but our experts will clean in a manner they deem most appropriate.",
            `We may contact you if we consider any Items to be at an increased risk of damage, including, but not limited to, those:`,
          ],
        },
        {
          name: "Wash and Fold Orders",
          bullets: [
            "Checking Items Please check all garments for hazardous items as we hold no responsibility for any items lost or damaged as a result of the cleaning process.",
            `Washing and Drying Process We wash all loads on a 30-degree cycle and tumble-dry on a medium heat. We will not be able to cater to personal requirements (e.g. temperature, washing powders, etc.). Please note that the items are not ironed.`,
            `Colour Separation We will separate the clothes into lights and darks for you. Although we will take the utmost care in doing this, we accept no responsibility for any bleeding or colour transfer during the cleaning process.`,
            `Size of Bag We will measure the laundry by weight. The minimum weight is 8kg and every kg over this will be charged accordingly. You will receive an updated email after we have weighed. Any orders below 8kg will be charged at the Wash, Tumble Dry & Fold price.`,
            `Damaged Items We cannot inspect individual care labels and therefore will not be liable for damage to items washed by the load. For garments that need to be specially treated i.e. leather, silk, cashmere, fur, velvet and other delicate garments, you should ensure that these items can be machine washed and tumble dried.`,
            `Excluded Items: The Wash and Fold will not include any bedding and towelling products. If these are included, then they will be added as an individual product and your bill will be amended accordingly.

            `,
            `Tagging Laundry items are tagged by the load, not individually. Therefore, we cannot accept any liability for missing items. Dry Cleaning and Iron only items are all tagged individually.
            `,
          ],
        },
        {
          name: "Curtains",
          bullets: [
            `We use a special cleaning programme for curtains, however there are some inherent risks, including:`,
            `Shrinkage of up to 4% may occur`,
            `Sunlight, age, general wear and tear and certain atmospheric conditions may have weakened the fabrics which would cause them to shred during the cleaning process.`,
            `Some glazed fabrics may become fully or partially de-lustered`,
            `Cleaning will remove soiling which may reveal sunlight, yellowing of fabric through smoke damage, colour loss caused by wear, condensation ‘tide’ marks, hidden staining.`,
          ],
        },
        {
          name: "If there is a problem with the Services",
          bullets: [
            "please contact Us by email as soon as reasonably possible at support@drinsed.com",
            "You will not have to pay for us to deal with any complaint.",
            "Complaints should be notified to Us within 24 hours of redelivery of any Item if you believe that We are in breach of our obligations under these Terms.",
            "As a consumer you have statutory rights in addition to the above and advice about these is available from your local Citizens’ Advice Bureau or Trading Standards office. Nothing in these Terms will affect these legal rights.",
          ],
        },
        {
          name: "Price and payment",
          bullets: [
            "The price of the Services will be set out in Our price list available on the App or at www.drinsed.com and will be the price in force at the time you place your Order. Any price changes will not affect Orders that We have accepted as above.",
            "Our prices include VAT. However, if the rate of VAT changes between the date we accept your Order and the date of payment, we will have to adjust the rate of VAT that you pay.",
            "When you place your Order, we capture the payment but do not charge your card, although it may show as a recent transaction. All payments are processed after cleaning. If your final total is greater than the captured total, this will be released when we have taken the full payment. We will take payment from the debit or credit card details which were supplied with your Order.",
            "If for any reason We are unable to take payment you will become liable to Us for the sum due plus interest at the rate of 3% a year above the base lending rate of Barclays Bank PLC. Interest will accrue on a daily basis from the due date until the date of actual payment. You must pay Us interest together with any overdue amount.",
            "We reserve the right to apply a minimum payment of up to 30p to any orders valuing between 1p and 29p. For more information about this minimum payment, please contact support@drinsed.com.",
          ],
        },
        // {
        //   name: "Drinsed Rewards",
        //   bullets: [
        //     "Each completed and paid order will be rewarded with a reward stamp. These stamps do not bear any monetary value.",
        //     "You will be automatically notified by email when you have collected enough stamps to earn a Drinsed reward. Reward offers cannot be returned, exchanged or refunded, and are subject to change without prior notice.",
        //   ],
        // },
        {
          name: "Our liability to you",
          bullets: [
            `In the unlikely event of loss or damage to an item, we will pay compensation in line with the Fair Compensation Guidelines as provided by the Textile Services Association. These guidelines indicate that fair and reasonable compensation be paid, allowing for wear and tear and the age of the item. It is reasonable for Us to ask for receipts confirming the purchase price prior to agreeing compensation. Failure to produce a valid proof of purchase may limit the compensation offered.`,
            `Subject to the following subparagraphs, you will be compensated for loss or damage which is due to Our Negligence.`,
            "We will not be responsible for any single item valued at more than £50 unless we have received and acknowledged notification via support@drinsed.com.",
            "We will not be responsible for any loss or damage that is foreseeable. Loss or damage is foreseeable if it is an obvious consequence of Our breach or if it was contemplated by you and Us at the time we entered a contract for the Services.",
            "You will not use the Services for any commercial, business or re-sale purpose, and We have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.",
            "We will not be responsible for any loss or damage (including, but not limited to) any colour loss, shrinkage or other damage, resulting from:",
          ],
        },
        {
          name: "Events Outside Our Control",
        },
        {
          name: "Information about Us and how to contact Us",
          bullets: [
            "We are a company registered in England and Wales, registration number 11688345. Our registered office is at 11 Castle Hill, Maidenhead, Berkshire, SL6 4AA.",
            "If you have any questions or complaints, please contact Us by emailing support@drinsed.com.",
            `If you wish to contact Us or give Us notice in writing, you can send this by e-mail to support@drinsed.com. We will confirm receipt of this by email. If We must contact you or give you notice in writing, we will do so by notification via the App or by e-mail to the address provided in the Order.`,
          ],
        },

        {
          name: "How we may use your personal information",
          bullets: [
            "We will only use the personal information you provide to Us as set out in our Privacy Policy at www.drinsed.com.",
          ],
        },
        {
          name: "Our Quality Guarantee",
          bullets: [
            "We check every garment before it is returned. However, if you are not completely satisfied you should contact us within 24 hours of delivery, and we will re-clean your items free of charge. Any re-clean requests submitted after 24 hours will be considered on a discretionary basis.",
            "To request re-cleaning for your items please email our Customer Care team, explaining the problem and attaching any relevant photos. We will contact you to arrange a suitable time for recollection.",
          ],
        },
        {
          name: "Re-cleaning policy",
          bullets: [
            "Re-cleaning only applies to individual items which have been cleaned by Us, with the original dry-cleaning ticket attached.",
            `If we are unable to remove a stain, you will be informed, and we will not be able to offer a complimentary re-clean.`,
          ],
        },
        {
          name: "Vouchers and Promotions",
          bullets: [
            "Vouchers are subject to expiry dates and value for promotions",
            `All Our vouchers are subject to Our full terms and conditions.`,
            `Vouchers cannot be used in conjunction with any other voucher or any other offer.`,
            `Only one voucher or code may be used per transaction.`,
            `Vouchers are strictly non-transferable and have no cash value. Placing a voucher for sale is strictly prohibited and renders the voucher void.`,
            `We reserve the right to reject a voucher with reasonable cause.`,
            `We reserve the right to withdraw offers at any time and without warning.`,
            `To redeem a voucher, you must present the code found on the voucher at checkout.`,
            `The minimum order value for orders using a voucher code is £20 or otherwise specified, including the voucher.`,
            `Once activated, vouchers must be used within 24 hours.`,
            `Vouchers are issued on and limited to a one per household basis.`,
          ],
        },
        {
          name: "Referral",
          bullets: [
            "If an existing customer refers a new customer (‘friend’) using the referral code created in the app, or via our direct mail vouchers, we will give both the referrer and friend a 25% off voucher.",
            `Referral vouchers have an expiry period of 365 days from the day that they are issued.`,
            `The referrer will only receive their referral voucher once their friend has completed a transaction and the order payment has been processed successfully.`,
            `The minimum order value for orders using a referral voucher code is £20, including the voucher.`,
            `Referral vouchers cannot be used in conjunction with any other customer offer or promotion.`,
            `Referral vouchers are issued on and limited to a one per household basis.`,
          ],
        },
        {
          name: "Other important terms",
          bullets: [
            `We may transfer Our rights and obligations under these Terms to another organisation. If this happens, we will notify you in writing, but this will not affect your rights or Our obligations.
`,
            `This contract is between you and Us. No other person shall have any rights to enforce any of its terms.
`,
            `Each of the paragraphs of these Terms operates separately. If any court or relevant authority decides that any of them are unlawful, the remaining paragraphs will remain in full force and effect.
`,
            `These Terms are governed by English law and will be subject to the exclusive jurisdiction of the English courts, unless you are a resident of Northern Ireland or Scotland, in which case you may also bring proceedings in Northern Ireland or Scotland as appropriate.
`,
          ],
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.terms__inner {
  margin: 5rem auto;
  text-align: center;
}

.section {
  text-align: left;
  margin: 5rem 0;
  .title {
    font-weight: 400;
  }

  .bullets {
    margin-left: 1rem;
    li {
      span {
        margin-right: 1rem;
      }
      margin: 1rem 0;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
}
</style>