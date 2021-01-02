<?php

declare(strict_types=1);

namespace Idea\model;

class SessionModel
{
    protected $sessionID;

    public function __construct()
    {
        if (!isset($_SESSION)) {
            $this->initSession();
        }
    }
    public function initSession()
    {
        session_start();
    }
    public function setSessionId()
    {
        $this->sessionID = session_id();
    }
    public function getSessionId()
    {
        return $this->sessionID;
    }
    public function sessionExist($session_name): bool
    {
        return isset($_SESSION[$session_name]);
    }
    public function createSession(string $session_name, $is_array = false)
    {
        if (!isset($_SESSION[$session_name])) {
            if ($is_array == true) {
                $_SESSION[$session_name] = $is_array;
            } else {
                $_SESSION[$session_name] = '';
            }
        }
    }
    public function insertValue($session_name, array $data)
    {
        if (is_array($_SESSION[$session_name])) {
            array_push($_SESSION[$session_name], $data);
        }
    }
    public function displaySession($session_name)
    {
        echo '<pre>';
        print_r($_SESSION[$session_name]);
        echo '</pre>';
    }
    public function removeSession($session_name = '')
    {
        if (!empty($session_name)) {
            unset($_SESSION[$session_name]);
        } else {
            unset($_SESSION);
        }
    }
    public function setSessionData($session_name, $data)
    {
        $_SESSION[$session_name] = $data;
    }
    public function sessionParam(string $session_name)
    {
        return (!empty($this->session[$session_name])) ? $this->session[$session_name] : 0;
    }
}
