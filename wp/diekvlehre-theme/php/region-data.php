
<?php
// PHP: Regionen und Post-Typen laden
function get_region_data() {
    $regions = ['tessin', 'romandie', 'ostschweiz', 'nsw'];
    $region_data = [];

    foreach ($regions as $region) {
        $args = [
            'post_type' => $region,
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ];

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $region_data[$region] = [];

            while ($query->have_posts()) {
                $query->the_post();

                $region_data[$region][] = [
                    'firma' => get_field('firma'),
                    'ort' => get_field('ort'),
                    'email' => get_field('email'),
                    'yousty' => get_field('yousty'),
                ];
            }

            wp_reset_postdata();
        }
    }

    return $region_data;
}
