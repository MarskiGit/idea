<?php
$counter = 1;
?>
<section class="container">
    <section class="wrap_context">
        <form data-form="area" novalidate>
            <legend>Dodaj Obszar</legend>
            <fieldset class="wrap-input_my">

                <span class="label-input_my">Nazwa Obszaru</span>
                <input class="input_my" type="text" name="area_name">
            </fieldset>
            <span class="massage_error" data-form="area_message"></span>
            <button type="submit" class="button_subbmit">Dodaj</button>
        </form>
    </section>
    <section class="wrap_context">
        <h3>Lista Obszarów</h3>
        <ol class="ol_list">
            <?php foreach ($pageParams['areaList'] as $area) : ?>
                <li>
                    <div class="ol_name">
                        <span><?php echo $counter ?></span>
                        <span><?php echo $area['area_name'] ?></span>
                    </div>
                    <div class="ol_event">
                        <button class="button_edit" data-id="<?php echo (int) $area['id_area'] ?>"> Edytuj </button>
                        <button class="button_edit" data-id="<?php echo (int) $area['id_area'] ?>"> Usuń</button>
                    </div>
                </li>
                <?php $counter++ ?>
            <?php endforeach; ?>
            </tbody>
        </ol>
    </section>

</section>