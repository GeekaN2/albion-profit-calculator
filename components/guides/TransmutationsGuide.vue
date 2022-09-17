<template>
  <div class="transmutations-guide">
    <h2 class="guide__header">
      Transmutations guide
    </h2>
    <p class="guide__paragraph">
      This is the guide how to use transmutations calculator and how it works.
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">How to select a resource</span>
      First of all, you need to select a resource that you want to transmute.
      <img
        src="/images/guides/transmutations/choose-resource.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      Transmutation occurs from one type of resource to the same type,
      increasing either subtier or tier. This is why there are two tables here
      at the same time.
      <img
        src="/images/guides/transmutations/2-tables.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      The first table shows the recipe profit from the previous tier and the
      same subtier. You can make sure by looking at the tooltip. E.g. T6.1 logs
      are transmuted to T7.1.
      <img
        src="/images/guides/transmutations/first-table.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      The second table shows the recipe profit from the previous subtier and the
      same tier. E.g. T8.2 logs are transmuted to T8.3.
      <img
        src="/images/guides/transmutations/second-table.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">Tooltip</span>
      Here is only 3 rows in a tooltip. The first row displays the resource
      <b>to which</b> you want to transmute. The second row displays the
      resource <b>that you</b> transmute. The third displays the transmutation
      fee.
      <br>
      Fee is calculated as:
      <span
        class="guide__code"
      >itemTransCost - (itemTransCost * (3000 - goldPrice) / 3000) + (value *
        fee / 20)</span>
      <br>
      <span class="guide__code">itemTransCost</span> is constant in the recipe
      that you can get from
      <a
        href="https://github.com/broderickhyman/ao-bin-dumps/blob/master/items.json"
        target="_blank"
        class="guide__link"
      >game dumps</a>.
      <br>
      <span class="guide__code">goldPrice</span> - gold selling price in the
      gold market.<br>
      <span class="guide__code">value</span> - value of the resource into which
      you are transmuting.<br>
      <span class="guide__code">fee</span> - craft bench fee where you craft, as
      a percentage<br>
      <img
        src="/images/guides/transmutations/tooltip.png"
        class="guide__image"
      >
      In the first row of first column you can see number like -6.5%, this is a
      market fee for selling an item. Second column displays how much silver you
      will spend or receive. And the third one shows last time of the last price
      update.
      <br>
      Prices are updating via client of
      <a
        class="guide__link"
        target="_blank"
        href="https://www.albion-online-data.com/"
      >the albion online data project</a>
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">Transmutation ways</span>
      The second way to watch the profit.
      Shows the way of transmutation from the left resource (which you buy) to the right one, 
      which you receive after several transmutations and sell on the market. <br>
      Hovering over <b>i</b> you can see the additional information.
      The tooltip is the same as above, the only difference is that the fee for transmutation
      is shown for the entire way.
      <img
        src="/images/guides/transmutations/ways.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">Settings</span>
      Settings contatin parameters that need to be adjusted to suit your
      conditions.
      <img
        src="/images/guides/transmutations/settings.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/gold-price.png"
        class="guide__image guide__image--inline"
      >
      Gold selling price in the gold market.
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/fee.png"
        class="guide__image guide__image--inline"
      >
      Craft bench fee in percents.
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/transmutation-ways.png"
        class="guide__image guide__image--inline"
      >
      Shows the best transmutation ways instead of tables.
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/update-sell-prices.png"
        class="guide__image guide__image--inline"
      >
      Button to update resource prices from the "sell resources city".
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/update-buy-prices.png"
        class="guide__image guide__image--inline"
      >
      Button to update resource prices from the "buy resources city".
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/sell-resources.png"
        class="guide__image guide__image--inline"
      >
      City where you want to sell transmuted resources.
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/transmutations/buy-resources.png"
        class="guide__image guide__image--inline"
      >
      City where you buy resources for transmutation.
    </p>
  </div>
</template>

<script>
export default {
  name: "TransmutationsGuide",
};
</script>

<style scoped lang="scss">
.transmutations-guide {
  display: block;
}
</style>