<?php

namespace App\AiAgents;

use LarAgent\Agent;

class ChatBotAgent extends Agent
{
    protected $model = 'openai/gpt-4.1-nano';

    protected $history = 'in_memory';

    protected $provider = 'default';

    protected $tools = [];

    public function instructions()
    {
        return "Respond to me with a nice and friendly joke";
    }

    public function prompt($message)
    {
        return $message;
    }
}
