<template>
  <div class="profit-tree-guide">
    <h2 class="guide__header">
      Profit tree guide
    </h2>
    <p class="guide__paragraph">
      This is the guide how to use craft profit tree calculator and how it
      works.
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">How to select an item</span>
      The profit is calculated for the entier branch of the item. So you need to
      choose the branch. They have the same position as in the game.
      <img
        src="/images/guides/profit-tree/choose-branch.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      When you choose the item under the branch selecting you will see loading
      bar and item recipe.
      <img
        src="/images/guides/profit-tree/loading-bar.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      When all the data has loaded, the profit table will appear.
      <img
        src="/images/guides/profit-tree/profit-table.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">How the table works</span>
      First, it shows the profit of all tiers at once. Each column is a tiers
      from T4 to T8, each row is an enchantment from 0 to 3. Focus on the color
      and glow.
    </p>
    <p class="guide__paragraph">
      Let's look at the line with the first enchantment
      <img
        src="/images/guides/profit-tree/enchantment-1.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      The number indicates the profit received from crafting one item. If it is
      <span class="guide__span--green">green</span>, then the profit is
      positive, if it is <span class="guide__span--red">red</span>, then you
      will lose silver. Small number below profit in silver shows profit as a
      percentage.
    </p>
    <p class="guide__paragraph">
      Profit in silver formula:
      <span class="guide__code">crafting_income &minus; crafting_expenses</span>
    </p>
    <p class="guide__paragraph">
      Profit as a percentage:
      <span
        class="guide__code"
      >profit_in_silver / crafting_expenses &times; 100</span>
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">Tooltip</span>
      Tooltip shows how and from what profit is calculated.
      <img
        src="/images/guides/profit-tree/t6-spirithunter.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      There are 3 columns in the tooltip.
    </p>
    <p class="guide__paragraph">
      The first one is the name of row: item name, material, crafting fee etc.
      Additional information is also shown to the right of the name.
      <br>
      Sales taxes for an item and journals, return percentage for materials,
      percentage of fee for fee. For journals, the number of filled journals
      from crafting 1 item.
    </p>
    <p class="guide__paragraph">
      Second shows income or expense. Basically, only journals and the sale of
      the item itself bring income.
    </p>
    <p class="guide__paragraph">
      Third column shows last date of price update. Data is updated via
      albiondata-client by players' hands.
    </p>
    <p class="guide__paragraph">
      The top left border shows the quality of the item. Matches color quality
      in the game. For example, the screenshot shows outstanding quality.
    </p>

    <p class="guide__paragraph">
      <span class="guide__subtitle">Modifiers in cells</span>
      The cell can also be displayed in
      <span class="guide__span--gray">gray</span>, indicating that the profit
      may be incorrect. There are several reasons for this. There are 2
      modifiers to help you figure out what's wrong more quickly.
      <br>
      <img
        src="/images/clock.svg"
        class="guide__svg"
      > - This modifier says
      that more than 1 day has passed since the last item price check. You
      should go to the market and update prices.
      <br>
      <img
        src="/images/exclamation-triangle.svg"
        class="guide__svg"
      > - This
      one says that there is no such artifact on sale. You can go to the market,
      or you can set the price yourself.
    </p>

    <p class="guide__paragraph">
      <span class="guide__subtitle">How to set your own prices</span>
      It's actually better to use the client to update prices, but you can still
      set your prices for materials and artifacts here. Click on the material
      whose prices you want to change. The table has the same format as the
      profit table. Columns are tiers, rows are enchantments.
      <br>
      It is also sometimes useful to look in here. This is the minimum selling
      price per unit of the resource.
      <img
        src="/images/guides/profit-tree/set-own-prices.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">Settings</span>
      Settings are one of the most important things that help you adapt the
      profit to your conditions and test it in very different circumstances.
      <img
        src="/images/guides/profit-tree/settings.png"
        class="guide__image"
      >
      Firstly, the icons.
      <br>
      <img
        src="/images/flask.svg"
        class="guide__svg"
      > - Open expert settings,
      additional settings that are needed only occasionally.
      <br>
      <img
        src="/images/save.svg"
        class="guide__svg"
      > - Saves your settings so
      you don't have to set them every time
      <br>
      <img
        src="/images/sync-alt.svg"
        class="guide__svg"
      > - Resets settings
      changes to your defaults.
    </p>
    <p class="guide__paragraph">
      <span class="guide__subtitle">Basic settings</span>
      <img
        src="/images/guides/profit-tree/use-journals.png"
        class="guide__image guide__image--inline"
      >
      It calculates the profit from the books when crafting and adds it to the
      final profit.
      <br>
      Formula for calculating profit from journals:
      <br>
      <span
        class="guide__code"
      >(journal_sell_price &minus; journal_buy_price) &times; filled_journals
        &times; (1 - fee)
      </span>
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/profit-tree/use-focus.png"
        class="guide__image guide__image--inline"
      >
      Changes the percentage of materials returned to the one that will be used
      when crafting with focus points. Material costs will be:
      <br>
      <span
        class="guide__code"
      >material_buy_price &times; number_of_materials_needed &times; (1 -
        return_percentage / 100)</span>
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/profit-tree/use-multiple-cities.png"
        class="guide__image guide__image--inline"
      >
      Allows you to see prices for materials, items, etc. from various cities.
      It is very useful if you want to increase your profit, for example,
      crafting items in specialized cities, transporting materials for crafting
      from cities with cheap prices, etc.
      <img
        src="/images/guides/profit-tree/multiple-cities.png"
        class="guide__image"
      >
      <br>
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/profit-tree/number-of-items-sold.png"
        class="guide__image guide__image--inline"
      >
      Shows the average number of items sold in the last month in each item
      slot. When counting items sold, all qualities are used.
      <br>
      It should also be borne in mind that the last 30 days are not always
      available. Often data are missing for the last few days. Thus, the total
      amount is calculated, for example, 20 days from the beginning of the
      previous month and is divided by these 20 days.
      <img
        src="/images/guides/profit-tree/items-sold.png"
        class="guide__image"
      >
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/profit-tree/use-average-price.png"
        class="guide__image guide__image--inline"
      >
      Changes the price of the item, instead of the price from the market, the
      average price will be shown. The tooltip will also show the average price
      of the item and the date it was last updated in days.
      <img
        src="/images/clock.svg"
        class="guide__svg"
      > modifier will not be
      displayed.
      <img
        src="/images/guides/profit-tree/average-price.png"
        class="guide__image"
      >
      This setting is useful sometimes on the black market, also useful when an
      item's abnormal price is shown. And it is not so useful, because often
      there is simply no data on the average price.
    </p>
    <p class="guide__paragraph">
      <img
        src="/images/guides/profit-tree/update-item.png"
        class="guide__image guide__image--inline"
      >
      When you click update button. The corresponding new data will be requested
      from the database.
    </p>
  </div>
</template>

<script>
export default {
  name: "ProfitTreeGuide",
};
</script>

<style scoped lang="scss">
.profit-tree-guide {
  display: block;
}
</style>