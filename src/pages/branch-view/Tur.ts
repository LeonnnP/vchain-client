export class Tur {

    static tasks = {
        "name": "get_twitter_test_ioc_post_slack",
        "version": "1.0",
        "trigger": {
            "type": "schedule",
            "cron": "* 1 * * * *"
        },
        "tasks": {
            "get_twitter_post": {
                "type": "lib",
                "runner_type": "python",
                "action": "turbine_twitter.get_time_line",
                "retries": 2,
                "params": {
                    "asset": "twitter",
                    "inputs": {
                        "count": 50
                    }
                },
                "publish": {
                    "pipe": "result"
                },
                "on-success": [
                    "get_url_from_text"
                    ]
            },
            "get_instagram_post": {
                "type": "lib",
                "runner_type": "python",
                "action": "turbine_intsagram.get_time_line",
                "retries": 2,
                "params": {
                    "asset": "instagram",
                    "inputs": {
                        "count": 50
                    }
                },
                "publish": {
                    "pipe": "result"
                },
                "on-success": [
                    "get_ioc_tc"
                    ]
            },
            "get_url_from_text": {
                "type": "lib",
                "runner_type": "python",
                "action": "turbine_pipe.extract_value",
                "retries": 2,
                "params": {
                    "inputs": {
                        "mask": "([0-9]{1,3}\\.){3}[0-9]{1,3}"
                    },
                    "map": {
                        "get_twitter_post.text": "text"
                    }
                },
                "publish": {
                    "pipe": "result"
                },
                "on-success": [
                    "get_ioc_tc"
                    ]
            },
            "get_ioc_tc": {
                "type": "lib",
                "runner_type": "python",
                "action": "turbine_threat_connect.get_ioc_batch",
                "retries": 2,
                "params": {
                    "asset": "threat_connect",
                    "inputs": {
                        "owner": "Common Community"
                    },
                    "pipe": null,
                    "map": {
                        "get_url_from_text.value": "indicator"
                    }
                },
                "publish": {
                    "pipe": "result"
                },
                "on-success": [
                    "render_message"
                    ],
                "on-error": [
                    "post_to_slack"
                    ]
            },
            "render_message": {
                "type": "lib",
                "runner_type": "python",
                "retries": 2,
                "action": "turbine_pipe.render_template",
                "params": {
                    "inputs": {
                        "template": "TC reports {{name}} is {{description}}. Rating {{rating}}. {{url}}"
                    },
                    "map": {
                        "get_ioc_tc.name": "name",
                        "get_ioc_tc.description": "description",
                        "get_ioc_tc.rating": "rating",
                        "get_ioc_tc.url": "url"
                    }
                },
                "publish": {
                    "pipe": "result"
                },
                "on-success": [
                    "post_to_slack"
                    ]
            },
            "post_to_slack": {
                "type": "lib",
                "runner_type": "python",
                "retries": 2,
                "action": "turbine_slack.post_messages",
                "params": {
                    "asset": "slack",
                    "inputs": {
                        "channel": "#turbine"
                    },
                    "map": {
                        "render_message.value": "message"
                    }
                }
            }
        }
    }
}