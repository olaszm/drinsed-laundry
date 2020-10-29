<template>
  <div class="faq">
    <div class="faq__inner wrapper">
      <Accordion :title="'How does it work?'">
        <div slot="content">
          <p>
            Its super simple! Place your order via our app or website, add all
            the items to your laundry basket or skip item selection and select
            your date and time for collection and delivery. Our dedicated agents
            will collect your items and provide you with Drinsed bags. We’ll
            return your garments on the day selected for delivery!
          </p>
        </div>
      </Accordion>
      <Accordion :title="'What services are available?'">
        <div slot="content">
          <p>
            Laundry – you can choose between white or mixed wash. All items are
            machine washed at 30 degrees and tumble dried at a medium
            temperature, folded, and packed.
          </p>
          <p>
            Laundry with Ironing – We clean each item individually whether that
            be dry cleaning or washed, we press and iron each item, place them
            on hangers and returned ready to wear.
          </p>
          <p>
            Dry Cleaning – Items are processed individually, spotted to take out
            tough stains, put through the dry-cleaning process, pressed, and
            placed on hangers, ready to wear.
          </p>
          <p>
            Ironing Only – For washed clothes, this service is ideal. We will
            press and iron each garment, however if there are tough wrinkles to
            take out, we would recommend you use a dry cleaning or laundry
            service with these items. All items are placed on hangers and ready
            to wear.
          </p>
          <p>
            Home & Bedding – These items can include Duvets, blankets, sheets
            etc. There is a longer turnaround time for these items, however we
            still do our best to return them within 48 hours.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Which areas do we service?'">
        <div slot="content">
          <p>
            Currently for our launch we cover: West London; UB7, UB8, UB9, UB10,
            Heathrow, Maidenhead, Slough, Windsor, Iver, Langley
          </p>
        </div>
      </Accordion>
      <Accordion :title="'What are your service hours?'">
        <div slot="content">
          <p>
            Our service hours are Monday – Friday 7am – 11pm, Saturday and
            Sunday 8am – 8.30pm
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Can I drop my clothes to you?'">
        <div slot="content">
          <p>
            We do not have any shops as we provide a collection and delivery
            service.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'How long will my cleaning take?'">
        <div slot="content">
          <p>
            Minimum of 48 hours, when you select your collection slot on the app
            or website, the next available delivery slot will be given.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Where are my clothes cleaned?'">
        <div slot="content">
          <p>
            We support our community and so we have partnered with high quality
            facilities to provide an excellent cleaning service to our
            customers. Our drivers collect your items and deliver them safely to
            our partner who will individually process each order.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Do I need to give you cleaning instructions?'">
        <div slot="content">
          <p>
            We will follow the instructions on the label unless you have
            provided specific instructions. You can do this on the website or
            app, via the special requests box. Also, keep in mind to separate
            the laundry from dry cleaning, our Drinsed bags will help you do
            this.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'What is a Laundry only service?'">
        <div slot="content">
          <p>
            You have the option of mixed or separate wash service, both will be
            washed at 30 degrees and tumble dried on a medium/low heat, folded,
            and packed together. If there are items you need ironing, please
            keep them separate from the laundry service, as they are priced per
            item.
          </p>
          <p>
            Check all the pockets for items left, as we do not take
            responsibility for any damage caused due to items left in pockets.
          </p>
        </div>
      </Accordion>
      <Accordion
        :title="'Can you ensure the quality of service and my items won’t be damaged?'"
      >
        <div slot="content">
          <p>
            We take pride in our partners quality work; they use the appropriate
            equipment for each item and handle our customer garments with care.
            In the unfortunate event of damage to your items, please notify us
            within 48 hours. Also please refer to our terms and conditions for
            more information.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Can you clean all types of stains?'">
        <div slot="content">
          <p>
            We clean all stains on all items, however this does not guarantee
            full removal of the stain. We will use special equipment and
            solutions based on the fabric and type of item, to ensure the best
            outcome. Please use the special requests box to add details of any
            stains.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Can I change the delivery address?'">
        <div slot="content">
          <p>
            Unfortunately, we only deliver to the address we collect from. If
            for any reason you need to change the delivery date or time, we can
            help with this, just contact us at:
            <a href="mailto:care@drinsed.com">care@drinsed.com</a>
          </p>
        </div>
      </Accordion>
      <Accordion :title="'How do I check the status of my order?'">
        <div slot="content">
          <p>
            Once you have placed your order via the app or website, simply go to
            your active orders to check the status of your order. Also, at every
            stage we send you a notification, driver on his way, cleaning in
            progress, delivery of your order in progress.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Collection & Delivery information'">
        <div slot="content">
          <ul>
            <li>
              Separate your laundry from dry cleaning and ironing, we will
              provide you with two Drinsed bags on your first collection.
            </li>
            <li>
              If you have any special instructions, please add them to the
              order.
            </li>
            <li>Ensure you have removed all items from pockets.</li>
            <li>
              We can collect from any address you provide within the areas we
              service, home, office, or concierge.
            </li>
          </ul>
        </div>
      </Accordion>
      <Accordion :title="'Payment'">
        <div slot="content">
          <p>
     There is a minimum charge of £20 per order which includes the collection and delivery charge. When you place an order and skip Item selection, a minimum amount of £20 is charged to your card. Once we receive your order at our partner premises, we itemise the order and provide you with an updated order total. The remainder amount is then charged to your card on despatch of your order back to you.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'If you missed your collection/delivery slot'">
        <div slot="content">
          <p>
         If you are not available at the time selected, it influences other customer orders and therefore could cause a delay. For this reason, if you do not notify us within 2 hours of placing your order there will be a £10 charge for orders where there is no-one to meet the driver.
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Cancellation'">
        <div slot="content">
          <p>
        Upon placing your order, you can cancel it within 2 hours. If this time has lapsed, please contact us at  , we will see what we can do to help
          </p>
        </div>
      </Accordion>
      <Accordion :title="'Rescheduling your order'">
        <div slot="content" >
            <p>
    If you need to reschedule your collection or delivery, please contact us at <a href="mailto:care@drinsed.com">care@drinsed.com</a>, we will try to accommodate your request.
          </p>
        </div>
      </Accordion>
    </div>
  </div>
</template>

<script>
import Accordion from "@/components/faq/Accordion";
export default {
  components: {
    Accordion,
  },
};
</script>

<style lang='scss' scoped>

.faq__inner {
    height: 100%;
    margin: 5rem auto;
}

</style>
